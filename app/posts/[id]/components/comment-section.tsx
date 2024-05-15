"use client";

import { useOptimistic } from "react";

import ListComment from "@/components/list-comment";

import { CommentListType } from "@/lib/database/get-comment-list";
import { NowUserInfo } from "@/lib/database/get-now-user-info";
import CommentForm from "./comment-form";

export default function CommentSection({
  postId, commentList, user
}: {
  postId: number, commentList: CommentListType, user: NowUserInfo
}) {
  const [optimisticCommentList, reducer] = useOptimistic<CommentListType, string>(
    [...commentList], 
    (previousState: CommentListType, payload: string) => {
      return [...previousState, {
        user: {
            username: user!.username,
            avatar: user!.avatar,
        },
        id: 0,
        payload,
        created_at: new Date(),
        updated_at: new Date(),
        userId: user!.id,
        postId,
      }]
    }
  );

  return (
    <>
      <div className="border-neutral-600 border-t p-5 flex flex-col gap-5">
        {
          optimisticCommentList.map((comment, idx) => {
            return (
              <ListComment key={idx} comment={comment} />
            )
          })
        }
      </div>
      <CommentForm postId={postId} reducer={reducer} />
    </>
  )
}