"use client"

import { useEffect, useState } from "react"
import BillingTotal from "./BillingTotal"
import TableListProduct from "./TableListProduct"

export default function ShoppingStep1({ setStep }) {
  const [selectedProducts, setSelectedProducts] = useState([])

  const handleChange = selectedProducts => {
    setSelectedProducts(selectedProducts)
  }

  // useEffect(() => {
  //   localStorage.setItem("selectedProducts", JSON.stringify([]))
  // }, [])

  return (
    <div className="flex gap-4 w-full ">
      <TableListProduct onChange={handleChange} />
      <BillingTotal setStep={setStep} selectedProducts={selectedProducts} />
    </div>
  )
}
