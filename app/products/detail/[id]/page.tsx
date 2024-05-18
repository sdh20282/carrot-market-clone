import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";

import ProductDeleteButton from "@/components/product-delete-button";

import { formatToWon } from "@/lib/utils";
import { getCachedProduct } from "@/lib/database/get-product";
import getProductIdList from "@/lib/database/get-product-id-list";
import getIsOwner from "@/lib/session/get-is-owner";
import { getCachedProductTitle } from "@/lib/database/get-product-title";
import ProductEditButton from "@/components/product-edit-button";

export async function generateMetadata({
  params
}: {
  params: { id: string }
}) {
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

  const product = await getCachedProduct(id);

  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);

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
            ?
            <div className="flex gap-5">
              <ProductDeleteButton id={product.id} />
              <ProductEditButton id={product.id} />
            </div>
            : null
          }
          <Link className="bg-orange-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-orange-400 transition" href={``} >채팅하기</Link>
        </div>
      </div >
    </div >
  );
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProductIdList();

  return products.map(product => ({ id: product.id + "" }));
}