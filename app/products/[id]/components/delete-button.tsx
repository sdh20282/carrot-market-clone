import { redirect } from "next/navigation";

import db from "@/lib/db";

export default function DeleteButton({ id }: { id: number }) {
  const deleteProduct = async () => {
    "use server";

    await db.product.delete({
      where: {
        id
      }
    });

    redirect("/products");
  }

  return (
    <form action={deleteProduct}>
      <button className="bg-red-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-red-400 transition">삭제하기</button>
    </form>

  )
}