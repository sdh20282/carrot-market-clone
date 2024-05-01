import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";
import { formatToWon } from "@/lib/utils";

import ProductDeleteButton from "@/components/product-delete-button";
import getIsOwner from "@/lib/database/get-is-owner";
import getProduct, { getCachedProduct, getCachedProductTitle, getProductTitle } from "@/lib/database/get-product";
import { revalidateTag } from "next/cache";

export async function generateMetadata({
  params
}: {
  params: { id: string }
}) {
  // const product = await getProduct(Number(params.id));
  // const product = await getProductTitle(Number(params.id));
  const product = await getCachedProductTitle(Number(params.id));

  return {
    title: `${product?.title}`
  }
}

export default async function ProductDetail({
  params
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  // const product = await getProduct(id);
  const product = await getCachedProduct(id);

  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);

  const revalidate = async () => {
    "use server";

    revalidateTag("xxxx");
  }

  return (
    <div className="py-10">
      <div className="relative aspect-square">
        <Image fill src={product.photo} alt={product.title} className="object-cover" />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {
            product.user.avatar 
            ? <Image src={product.user.avatar} width={40} height={40} alt={product.user.username} />
            : <UserIcon />
          }
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>  
      <div className="fixed w-full bottom-0 left-0 py-7 px-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-lg">{formatToWon(product.price)}원</span>
        <div className="flex gap-3">
          {
            isOwner
            ? <ProductDeleteButton id={product.id} />
            : null
          }
          <form action={revalidate}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-red-400 transition">revalidate title cache</button>
          </form>
          <Link className="bg-orange-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-orange-400 transition" href={``} >채팅하기</Link>
        </div>
      </div >
    </div >
  );
}