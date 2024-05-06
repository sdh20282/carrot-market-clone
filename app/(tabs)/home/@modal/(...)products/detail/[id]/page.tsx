import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";

import CloseButton from "./components/close-button";
import ProductDeleteButton from "@/components/product-delete-button";
import { formatToWon } from "@/lib/utils";
import getIsOwner from "@/lib/session/get-is-owner";
import getProduct from "@/lib/database/get-product";
import ProductEditButton from "@/components/product-edit-button";

export default async function Modal({
  params
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);

  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <CloseButton />
      <div className="max-w-screen-sm flex flex-col justify-center w-full bg-neutral-900 rounded-md p-5">
        <div className="relative w-full aspect-square rounded-md overflow-hidden">
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
        <div className="flex justify-between items-center">    
          <div className="p-5">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p>{product.description}</p>
          </div>
          <span className="font-semibold text-lg">{formatToWon(product.price)}원</span>
        </div>
        <div className="w-full p-5 flex items-center">
          <div className="flex gap-5 ml-auto">
            {
              isOwner
              ? 
              <div className="flex gap-3">
                <ProductDeleteButton id={product.id} />
                <ProductEditButton id={product.id} />
              </div>
              : null
            }
            <Link className="bg-orange-500 px-5 py-2.5 rounded-md font-semibold text-white hover:bg-orange-400 transition" href={``} >채팅하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}