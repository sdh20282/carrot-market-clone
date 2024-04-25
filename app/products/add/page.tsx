"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/button";
import Input from "@/components/input";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { uploadProduct } from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file.type.startsWith("image")) {
      alert("이미지 파일만 업로드할 수 있습니다!");

      return;
    }

    if (file.size > 1000000) {
      alert("이미지 파일의 용량이 너무 큽니다!!");

      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const [state, dispatch] = useFormState(uploadProduct, null);

  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-5">
        <label 
          htmlFor="photo" 
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover bg-no-repeat" 
          style={{
            backgroundImage: `url(${preview})`,
          }}>
            {
              preview
              ? null
              : <>
                <PhotoIcon className="w-20" />
                <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
                {state?.fieldErrors.photo}
              </>
            }
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" hidden />
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