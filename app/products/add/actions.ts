"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { File } from "buffer";
import fs from "fs/promises";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";
import { productSchema } from "./schema";

export async function uploadProduct(prev: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  }

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }

  const result = productSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  if (!session.id) {
    return notFound();
  }

  const product = await db.product.create({
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
  redirect("/home");
}