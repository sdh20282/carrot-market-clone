import Image from "next/image";
import { notFound } from "next/navigation";

import { EllipsisVerticalIcon, EyeIcon, UserIcon } from "@heroicons/react/24/solid";

import LikeButton from "@/components/like-button";
import { formatToTimeAgo } from "@/lib/utils";
import { PostType } from "@/lib/database/get-post";

export default function PostContent({
  post, isLiked, likeCount, postId
}: {
  post: PostType,
  isLiked: boolean,
  likeCount: number,
  postId: number,
}) {
  if (!post) {
    return notFound();
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-5">
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
        <button className="ml-auto">
          <EllipsisVerticalIcon className="size-5" />
        </button>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start mb-5">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={postId} />
      </div>
    </>
  )
}