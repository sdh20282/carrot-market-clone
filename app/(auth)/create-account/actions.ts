"use server";

import { redirect } from "next/navigation";

import {z} from "zod";
import bcrypt from "bcrypt";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import updateSession from "@/lib/session/update-session";

const checkUsername = (username: string) => {
  return !username.includes("potato");
}

const chekcPasswords = ({password, confirm_password}: {password: string, confirm_password: string}) => {
  return password === confirm_password;
}

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be astring!!!",
        required_error: "Where is my username???"
      })
      .toLowerCase()
      .trim()
      .refine(checkUsername, "No potatoes allowed!!"),
    email: z
      .string()
      .email()
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      }
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      }
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "There is an account already registered with that email.",
        path: ["email"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .refine(chekcPasswords, {
    message: "Both passwords should be same!!!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  }

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword
    },
    select: {
      id: true, 
    }
  });

  await updateSession(user);
  redirect("/profile");
}