import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

import ProductList from "@/components/product-list";
import { getCachedInitialProductList } from "@/lib/database/get-product-list";

export const metadata = {
  title: "Home",
}

// export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Products() {
  const initialProducts = await getCachedInitialProductList();
  // const revalidate = async () => {
  //   "use server";

  //   revalidatePath("/home");
  // }

  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      {/* <form action={revalidate}>
        <button>Revalidate</button>
      </form> */}
      <Link href="/products/add" className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400">
        <PlusIcon className="size-10" />
      </Link>
    </div>
  )
}