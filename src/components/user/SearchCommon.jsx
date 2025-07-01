"use client"

import { SearchOutlined } from "@ant-design/icons"
import { useState } from "react"

import { Input } from "antd"
import styled from "@emotion/styled"

export default function SearchCommon(props) {
  const { onChange, refetch } = props
  const [value, setValue] = useState("")

  return (
    <div className="bg-[#2490eb] rounded h-28 mb-10  flex items-center justify-center">
      <CustomInput className="w-3/4 flex">
        <Input
          placeholder="Tìm kiếm..."
          onChange={e => {
            setValue(e.target.value)
          }}
          allowClear
        />
        <div
          className="h-14 w-14 bg-[#14457b] hover:bg-black  flex items-center justify-center rounded-e"
          onClick={() => {
            onChange && onChange(value)
            refetch && refetch()
          }}>
          <SearchOutlined className="text-white text-3xl" />
        </div>
      </CustomInput>
    </div>
  )
}

const CustomInput = styled.div`
  & .ant-input-affix-wrapper {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    height: 56px;
  }
`
