import { redirect } from "next/navigation";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default function ProductDeleteButton({ id }: { id: number }) {
  const deleteProduct = async () => {
    "use server";

    await db.product.delete({
      where: {
        id
      }
    });

    revalidatePath("/home");
    revalidatePath(`/products/detail/${id}`);
    redirect("/home");
  }

  return (
    <form action={deleteProduct}>
      <button className="bg-red-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-red-400 transition">삭제하기</button>
    </form>
  );
}