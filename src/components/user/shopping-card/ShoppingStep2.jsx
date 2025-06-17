"use client";

import BillingDetailForm from "./BillingDetailForm";
import BillingDetailsStep2 from "./BillingDetailsStep2";

export default function ShoppingStep2({ setStep }) {
  return (
    <div className="flex gap-4">
      <BillingDetailForm />
      <BillingDetailsStep2 setStep={setStep} />
    </div>
  );
}
