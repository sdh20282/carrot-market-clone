"use client";

import { useEffect, useState } from "react";

import ListComment from "@/components/list-comment";
import { CommentListType } from "@/lib/database/get-comment-list";

export default function CommentList({
  commentList
}: {
  commentList: CommentListType
}) {
  const [comments, setComments] = useState<CommentListType>([]);

  useEffect(() => {
    setComments(commentList);
  }, [commentList]);

  return (
    <div className="border-neutral-600 border-t p-5 flex flex-col gap-5">
      {
        comments.map(comment => {
          return (
            <ListComment key={comment.id} comment={comment} />
          )
        })
      }
    </div>
  )
}