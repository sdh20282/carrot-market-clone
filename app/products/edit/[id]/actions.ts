"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { File } from "buffer";
import fs from "fs/promises";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";
import { productEditSchema } from "./schema";

export async function editProduct(prev: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  }

  if (data.photo instanceof File && data.photo.size === 0) {
    data.photo = formData.get("prevImage");
  }

  if (data.photo instanceof File && data.photo.size !== 0) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }

  const result = productEditSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  if (!session.id) {
    return notFound();
  }

  const product = await db.product.update({
    where: {
      id: Number(formData.get("id")),
    },
    data: {
      photo: result.data.photo,
      title: result.data.title,
      price: result.data.price,
      description: result.data.description,
      user: {
        connect: {
          id: session.id,
        }
      }
    },
    select: {
      id: true,
    }
  });

  revalidatePath("/home");
  revalidatePath(`/products/detail/${product.id}`);
  redirect(`/products/detail/${product.id}`);
}