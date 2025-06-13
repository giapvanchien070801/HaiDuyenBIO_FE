import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} là bắt buộc.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const TableListProduct = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Sản phẩm 1",
      age: "150.000đ",
      address: "Còn hàng",
      quantity: 1,
    },
    {
      key: "1",
      name: "Sản phẩm 2",
      age: "200.000đ",
      address: "Còn hàng",
      quantity: 1,
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    message.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const handleQuantityChange = (value, key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === key);
    newData[index].quantity = value;
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "Giá",
      dataIndex: "age",
      width: "20%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "20%",
      render: (_, record) => (
        <InputNumber
          min={1}
          defaultValue={record.quantity}
          onChange={(value) => handleQuantityChange(value, record.key)}
          className="w-20"
        />
      ),
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
            cancelText="Hủy"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              className="hover:opacity-80"
            >
              Xóa
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Sản phẩm ${count + 1}`,
      age: "100.000đ",
      address: "Còn hàng",
      quantity: 1,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Button
        onClick={handleAdd}
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4 hover:opacity-80"
      >
        Thêm sản phẩm
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
          showTotal: (total) => `Tổng ${total} sản phẩm`,
        }}
        className="shadow-lg rounded-lg"
      />
    </div>
  );
};

export default TableListProduct;
