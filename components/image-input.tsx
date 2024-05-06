"use client";

import { InputHTMLAttributes, useEffect, useRef, useState } from "react";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ImageInputProps {
  name: string;
  errors?: string[];
  image? : string;
}

export default function ImageInput({
  name,
  errors = [],
  image = "",
  ...rest
}: ImageInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [preview, setPreview] = useState(image);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event;

    if (!files) {
      alert("이미지 파일을 추가해주세요!");

      return;
    }

    const file = files[0];

    if (!file) {
      alert("이미지 파일을 추가해주세요!");

      return;
    }

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

  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image && imageRef.current) {
      // imageRef.current.value = image;

      // console.log(imageRef.current.value);
    }
  }, [image]);

  const onCancleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setPreview("");

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  }

  return (
    <>
      <label 
        htmlFor="photo" 
        className="relative border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover bg-no-repeat" 
        style={{
          backgroundImage: `url(${preview})`,
        }}>
          {
            preview
            ? 
            <button className="absolute top-4 right-4 bg-neutral-800 rounded-full p-2" onClick={onCancleClick}>
              <XMarkIcon className="w-8" />
            </button>
            : 
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
              {
                errors.map((error, idx) => <span key={idx} className="text-red-500 font-medium">{error}</span>)
              }
            </>
          }
        </label>
        <input
          {...rest}
          name={name}
          ref={imageRef}
          id="photo"
          type="file"
          onChange={onImageChange}
          hidden
        />
    </>
  )
}