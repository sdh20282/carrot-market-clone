"use client";

import { useFormState } from "react-dom";

import Button from "@/components/button";
import Input from "@/components/input";

import { uploadPost } from "./actions";

export default function AddPost() {
  const [state, dispatch] = useFormState(uploadPost, null);

  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-5">
        <Input
          name="title"
          type="text"
          placeholder="제목"
          required
          errors={state?.fieldErrors.title}
        />
        <Input
          name="content"
          type="text"
          placeholder="내용"
          required
          errors={state?.fieldErrors.content}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}