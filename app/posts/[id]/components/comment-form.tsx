"use client";

import { useFormState } from "react-dom";

import { uploadComment } from "../actions";

import CommentButton from "@/components/comment-button";
import CommentInput from "@/components/comment-input";
import { useRef } from "react";

export default function CommentForm({
  postId
}: {
  postId: number
}) {
  const [state, dispatch] = useFormState(uploadComment, null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={dispatch} className="fixed bottom-0 pt-6 px-4 pb-10 max-w-screen-sm w-full flex gap-6 border-neutral-600 border-t" ref={formRef}>
      <CommentInput 
        name="comment"
        type="text"
        placeholder="내용을 입력하세요..."
        required
        errors={state?.fieldErrors.comment}
      />
      <input type="text" name="postId" defaultValue={postId} readOnly hidden />
      <CommentButton
        text="게시"
      />
    </form>
  )
}