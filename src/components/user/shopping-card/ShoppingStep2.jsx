"use client"

import BillingDetailForm from "./BillingDetailForm"
import BillingDetailsStep2 from "./BillingDetailsStep2"
import { Form } from "antd"

export default function ShoppingStep2({ setStep }) {
  const [form] = Form.useForm()

  return (
    <div className="flex gap-4">
      <BillingDetailForm form={form} setStep={setStep} />
      <BillingDetailsStep2 setStep={setStep} form={form} />
    </div>
  )
}
