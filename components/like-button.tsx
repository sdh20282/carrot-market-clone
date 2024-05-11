"use client";

import { HandThumbUpIcon as HandThumbUpIconSloid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";

import { likePost, dislikePost } from "@/app/posts/[id]/actions";
import { startTransition, useOptimistic } from "react";

export default function LikeButton({
  isLiked, likeCount, postId
}: {
  isLiked: boolean,
  likeCount: number,
  postId: number,
}) {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount }, 
    (previousState) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
      }
    }
  );

  const onClick = async () => {
    startTransition(() => {
      reducer(undefined);
    });

    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  }

  return (
    <button
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full py-2 px-4 transition-colors ${state.isLiked ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-400" : "hover:bg-neutral-800"}`}
      onClick={onClick}
    >
      {
        state.isLiked
        ? <HandThumbUpIconSloid className="size-5" />
        : <HandThumbUpIconOutline className="size-5" />
      }
      <span>좋아요 ({state.likeCount})</span>
    </button>
  )
}