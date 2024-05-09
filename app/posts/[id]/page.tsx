import Image from "next/image";
import { notFound } from "next/navigation";

import { EyeIcon, HandThumbUpIcon as HandThumbUpIconSloid, UserIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";

import { formatToTimeAgo } from "@/lib/utils";
import { getCachedPost } from "@/lib/database/get-post"
import { getCachedLikedStatus } from "@/lib/database/get-is-liked";

import { dislikePost, likePost } from "./actions";

export default async function PostDetail({
  params
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);

  if (!post) {
    return notFound();
  }

  const likePostAction = async () => {
    "use server";

    await likePost(id);
  };
  
  const dislikePostAction = async () => {
    "use server";

    await dislikePost(id);
  }

  const { isLiked, likeCount } = await getCachedLikedStatus(id);

  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        {
          post.user.avatar
          ? <Image
              width={28}
              height={28}
              className="size-7 rounded-full"
              src={post.user.avatar!}
              alt={post.user.username}
            />
          :  <UserIcon className="size-7 rounded-full" />

        }
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <form action={isLiked ? dislikePostAction : likePostAction}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full py-2 px-4 transition-colors ${isLiked ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-400" : "hover:bg-neutral-800"}`}
          >
            {
              isLiked
              ? <HandThumbUpIconSloid className="size-5" />
              : <HandThumbUpIconOutline className="size-5" />
            }
            <span>공감하기 ({likeCount})</span>
          </button>
        </form>
      </div>
    </div>
  )
}