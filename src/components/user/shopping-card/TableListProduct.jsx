import React, { useContext, useEffect, useRef, useState } from "react"
import { Form, Input, message, Table, InputNumber, Popconfirm, Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      // Handle error silently
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} là bắt buộc.` }]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

const TableListProduct = ({ onChange }) => {
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedListProducts = localStorage.getItem("listProducts")
    if (savedListProducts) {
      const products = JSON.parse(savedListProducts)
      // Transform data to match table structure
      const transformedData = products.map(product => ({
        key: product?.id?.toString(),
        id: product?.id,
        name: product?.name,
        image: product?.image,
        priceFrom: product.priceFrom,
        price: product.price,
        discount: product.discount,
        quantity: product.quantity
      }))
      setDataSource(transformedData)
    }
  }, [])

  // Load selected products from localStorage on component mount
  // useEffect(() => {
  //   const savedSelectedProducts = localStorage.getItem("selectedProducts")
  //   const selectedProducts = JSON.parse(savedSelectedProducts)?.filter(product => product !== null)

  //   if (selectedProducts.length > 0) {
  //     const selectedIds = selectedProducts.map(product => product?.id?.toString())
  //     setSelectedRowKeys(selectedIds)

  //     // Call onChange with selected products data
  //     if (onChange && dataSource.length > 0) {
  //       onChange(selectedProducts)
  //     }
  //   }
  // }, [dataSource])

  const handleDelete = key => {
    const newData = dataSource.filter(item => item.key !== key)
    setDataSource(newData)

    // Remove from selectedRowKeys if it was selected
    setSelectedRowKeys(prevKeys => {
      const newSelectedKeys = prevKeys.filter(selectedKey => selectedKey !== key)

      // Get current selected products from localStorage
      const savedSelectedProducts = localStorage.getItem("selectedProducts")
      let selectedProducts = []
      if (savedSelectedProducts) {
        selectedProducts = JSON.parse(savedSelectedProducts)
      }

      // Remove the deleted product from selectedProducts
      const updatedSelectedProducts = selectedProducts.filter(product => product?.id?.toString() !== key)

      // Update localStorage with new selected products
      localStorage.setItem("selectedProducts", JSON.stringify(updatedSelectedProducts))

      return newSelectedKeys
    })

    // Update localStorage
    const updatedProducts = newData.map(({ key, ...rest }) => ({
      id: rest.id,
      name: rest.name,
      image: rest.image,
      priceFrom: rest.priceFrom,
      price: rest.price,
      discount: rest.discount,
      quantity: rest.quantity
    }))
    localStorage.setItem("listProducts", JSON.stringify(updatedProducts))

    message.success("Đã xóa sản phẩm khỏi giỏ hàng!")
  }

  const handleQuantityChange = (value, key) => {
    const newData = [...dataSource]
    const index = newData.findIndex(item => item.key === key)
    newData[index].quantity = value
    setDataSource(newData)

    // Update localStorage
    const updatedProducts = newData.map(({ key, ...rest }) => ({
      id: rest.id,
      name: rest.name,
      image: rest.image,
      priceFrom: rest.priceFrom,
      price: rest.price,
      discount: rest.discount,
      quantity: rest.quantity
    }))

    onChange(updatedProducts?.filter(product => selectedRowKeys.includes(product?.id?.toString())))

    localStorage.setItem("listProducts", JSON.stringify(updatedProducts))

    // Update selectedProducts in localStorage if the product is selected
    // const savedSelectedProducts = localStorage.getItem("selectedProducts")
    // if (savedSelectedProducts) {
    //   const selectedProducts = JSON.parse(savedSelectedProducts)
    //   const updatedSelectedProducts = selectedProducts.map(product => {
    //     if (product?.id?.toString() === key) {
    //       return { ...product, quantity: value }
    //     }
    //     return product
    //   })
    //   debugger

    // }
  }

  const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price)
  }

  const defaultColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "40%",
      editable: true
    },
    {
      title: "Giá",
      dataIndex: "priceFrom",
      width: "20%",
      render: (priceFrom, record) => (
        <div>
          <div className="text-red-600 font-semibold">{formatPrice(priceFrom)}</div>
          {record.price && <div className="text-gray-500 line-through text-sm">{formatPrice(record.price)}</div>}
        </div>
      )
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "20%",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={value => handleQuantityChange(value, record.key)}
          className="w-20"
        />
      )
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Xác nhận xóa?"
            description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => handleDelete(record.key)}
            okText="Đồng ý"
            cancelText="Hủy">
            <Button
              icon={<DeleteOutlined />}
              danger
              disabled={selectedRowKeys.includes(record.key)}
              className="hover:opacity-80">
              Xóa
            </Button>
          </Popconfirm>
        ) : null
    }
  ]

  const handleSave = row => {
    const newData = [...dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setDataSource(newData)

    // Update localStorage
    const updatedProducts = newData.map(({ key, ...rest }) => ({
      id: rest.id,
      name: rest.name,
      image: rest.image,
      priceFrom: rest.priceFrom,
      price: rest.price,
      discount: rest.discount,
      quantity: rest.quantity
    }))
    localStorage.setItem("listProducts", JSON.stringify(updatedProducts))
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys)

      // Save selected product IDs to localStorage
      // localStorage.setItem("selectedProducts", JSON.stringify(selectedRows))

      // Call the onChange prop with selected products
      if (onChange) {
        onChange(selectedRows)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 5,
          showTotal: total => `Tổng ${total} sản phẩm`
        }}
        className="shadow-lg rounded-lg"
      />
    </div>
  )
}

export default TableListProduct
