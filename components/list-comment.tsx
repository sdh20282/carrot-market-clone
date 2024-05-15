import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";
import { deleteComment } from "@/app/posts/[id]/actions";

type comment = {
  user: {
    username: string;
    avatar: string | null;
  };
} & {
  id: number;
  payload: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
  postId: number;
}

export default function ListComment({
  comment, userId
}: {
  comment: comment,
  userId: number
}) {
  const onDeleteComment = async () => {
    await deleteComment({ commentId: comment.id, postId: comment.postId })
  }

  return (
    <div className="border-neutral-500 text-neutral-400 flex justify-between items-center gap-2 last:pb-0 last:border-b-0">
      <div className="flex items-center gap-5">
        {
          comment.user.avatar
          ? <Image
              width={28}
              height={28}
              className="size-10 rounded-full"
              src={comment.user.avatar!}
              alt={comment.user.username}
            />
          : <UserIcon className="size-10 rounded-full" />
        }
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{comment.user.username}</span>
          <span className="text-lg text-white">{comment.payload}</span>
          <span className="text-[12px]">{formatToTimeAgo(comment.created_at.toString())}</span>
        </div>
      </div>
      <div>
        {
          userId === comment.userId
          ? <button className="text-sm" onClick={onDeleteComment}>삭제</button>
          : null
        }
      </div>
    </div>
  )
}