"use client";

import { useFormState } from "react-dom";

import { editProduct } from "../actions";
import ImageInput from "@/components/image-input";
import Input from "@/components/input";
import Button from "@/components/button";

interface ProductProps {
  title: string;
  price: number;
  photo: string;
  description: string;
  id: number;
}

export default function EditForm({
  product
}: {
  product: ProductProps
}) {
  const [state, dispatch] = useFormState(editProduct, null);

  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-5">
        <input type="text" name="id" defaultValue={product.id} hidden />
        <ImageInput
          name="photo"
          placeholder="사진을 추가해주세요."
          image={product.photo}
          errors={state?.fieldErrors.photo}
        />
        <input type="text" name="prevImage" defaultValue={product.photo} hidden />
        <Input
          name="title"
          type="text"
          placeholder="제목"
          required
          defaultValue={product.title}
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          placeholder="가격"
          required
          defaultValue={product.price}
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          placeholder="상세 설명"
          required
          defaultValue={product.description}
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}