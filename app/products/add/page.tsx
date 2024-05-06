"use client";
import { useFormState } from "react-dom";

import Button from "@/components/button";
import Input from "@/components/input";

import { uploadProduct } from "./actions";
import ImageInput from "@/components/image-input";

export default function AddProduct() {
  const [state, dispatch] = useFormState(uploadProduct, null);

  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-5">
        <ImageInput
          name="photo"
          placeholder="사진을 추가해주세요."
          errors={state?.fieldErrors.photo}
        />
        <Input
          name="title"
          type="text"
          placeholder="제목"
          required
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          placeholder="가격"
          required
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          placeholder="상세 설명"
          required
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  )
}