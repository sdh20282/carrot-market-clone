import { redirect } from "next/navigation";

export default function ProductEditButton({ id }: { id: number }) {
  const editProduct = async () => {
    "use server";

    redirect(`/products/edit/${id}`);
  }

  return (
    <form action={editProduct}>
      <button className="bg-green-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-green-400 transition">수정하기</button>
    </form>
  );
}