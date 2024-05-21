"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function PostOptions({
  postId
}: {
  postId: number
}) {
  const [onModal, setOnModal] = useState(false);
  const router = useRouter();

  const onClickModal = () => {
    setOnModal(state => !state);
  }

  const offModal = () => {
    setOnModal(false);
  }

  useEffect(() => {
    window.addEventListener("click", offModal);

    return () => {
      window.removeEventListener("click", offModal);
    }
  }, []);

  return (
    <div className="relative ml-auto" onClick={(e) => { e.stopPropagation(); }} >
      <button className={`rounded-md transition-colors hover:bg-neutral-800 ${onModal ? "bg-neutral-800" : ""}`} onClick={onClickModal}>
        <EllipsisVerticalIcon className="size-7" />
      </button>
      {
        onModal
        ? <div className="absolute w-24 flex flex-col right-0 top-10 bg-neutral-800 rounded-md py-2 *:text-sm *:text-center *:text-white">
          <Link href={`/posts/edit/${postId}`} className="hover:bg-neutral-700 transition-colors py-2">
            <span>수정</span>
          </Link>
          <Link href={`/posts/delete/${postId}`} className="hover:bg-neutral-700 transition-colors py-2">
            <span>삭제</span>
          </Link>
        </div>
        : null
      }
    </div>
  )
}