"use client";

import { startTransition, useRef } from "react";
import { useFormState } from "react-dom";

import { uploadComment } from "../actions";

import CommentButton from "@/components/comment-button";
import CommentInput from "@/components/comment-input";

export default function CommentForm({
  postId, reducer
}: {
  postId: number, reducer: Function
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const interceptAction = async (_: any, formData: FormData) => {
    startTransition(() => {
      reducer(formData.get("comment") as string);
    });

    const result = await uploadComment(_, formData);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    return result;
  }

  const [state, dispatch] = useFormState(interceptAction, null);
  return (
    <form action={dispatch} className="fixed bottom-0 pt-6 px-4 pb-10 max-w-screen-sm w-full flex gap-6 border-neutral-600 border-t">
        <CommentInput 
          name="comment"
          ref={inputRef}
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