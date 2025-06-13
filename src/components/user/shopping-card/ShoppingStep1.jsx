"use client";

import BillingTotal from "./BillingTotal";
import TableListProduct from "./TableListProduct";

export default function ShoppingStep1() {
  return (
    <div className="flex gap-4 w-full ">
      <TableListProduct />
      <BillingTotal />
    </div>
  );
}
