import { notFound } from "next/navigation";

import PostEditForm from "./components/edit-form";

import { getCachedPost } from "@/lib/database/get-post";
import getIsOwner from "@/lib/session/get-is-owner";

export default async function PostEdit({
  params
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);
  
  if (!post) {
    return notFound();
  }

  const isOwner = await getIsOwner(post.userId);

  if (!isOwner) {
    return notFound();
  }

  return (
    <div>
      <PostEditForm 
        postId={post.id} 
        title={post.title} 
        content={post.description}
      />
    </div>
  )
}