"use client";

import { useFormState } from "react-dom";

import { editPost } from "../actions";

import Button from "@/components/button";
import Input from "@/components/input";

interface PostEditProps {
  postId: number;
  title: string;
  content: string | null;
}

export default function PostEditForm({
  postId, title, content
}: PostEditProps) {
  const [state, dispatch] = useFormState(editPost, null);

  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-5">
        <input type="hidden" name="id" defaultValue={postId} />
        <Input
          name="title"
          type="text"
          placeholder="제목"
          required
          defaultValue={title}
          errors={state?.fieldErrors.title}
        />
        <Input
          name="content"
          type="text"
          placeholder="내용"
          required
          defaultValue={content ?? ""}
          errors={state?.fieldErrors.title}
        />
        <Button text="수정 완료" />
      </form>
    </div>
  )
}