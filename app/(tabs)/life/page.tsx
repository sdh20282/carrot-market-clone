import Link from "next/link";

import { PlusIcon } from "@heroicons/react/24/solid";

import PostLink from "./components/post-link";

import { getCachedPostList } from "@/lib/database/get-post-list";

export const metadata = {
  title: "동네생활",
}

export const revalidate = 30;

export default async function Life() {
  const posts = await getCachedPostList();

  return (
    <div className="p-5 pb-24 flex flex-col">
      <Link href="/posts/add" className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400">
        <PlusIcon className="size-10" />
      </Link>
      {
        posts.map((post) => {
          return (
            <PostLink post={post} key={post.id} />
          );
        })
      }
    </div>
  )
}