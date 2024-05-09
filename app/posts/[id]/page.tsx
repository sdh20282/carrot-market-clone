import Image from "next/image";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { EyeIcon, HandThumbUpIcon, UserIcon } from "@heroicons/react/24/solid";

import { getPost } from "@/lib/database/get-post"
import { formatToTimeAgo } from "@/lib/utils";
import db from "@/lib/db";
import getSession from "@/lib/session/get-session";
import { getIsLiked } from "@/lib/database/get-is-liked";

export default async function PostDetail({
  params
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  const likePost = async () => {
    "use server";

    try {
      const session = await getSession();

      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });
      
      revalidatePath(`/post/${id}`);
    } catch (e) {}
  };
  
  const dislikePost = async () => {
    "use server";
  
    try {
      const session = await getSession();

      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });

      revalidatePath(`/post/${id}`);
    } catch (e) {}
  }

  const isLiked = await getIsLiked(id);

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
        <form action={isLiked ? dislikePost : likePost}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors`}
          >
            <HandThumbUpIcon className="size-5" />
            <span>공감하기 ({post._count.likes})</span>
          </button>
        </form>
      </div>
    </div>
  )
}