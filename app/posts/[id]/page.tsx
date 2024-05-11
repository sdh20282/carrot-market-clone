import { notFound } from "next/navigation";

import PostContent from "./components/post-content";
import CommentList from "./components/comments";

import { getCachedPost } from "@/lib/database/get-post"
import { getCachedCommentList } from "@/lib/database/get-comment-list";
import { getCachedLikedStatus } from "@/lib/database/get-is-liked";

import CommentForm from "./components/comment-form";

export default async function PostDetail({
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

  const comments = await getCachedCommentList(id);
  const { isLiked, likeCount } = await getCachedLikedStatus(id);

  return (
    <div className="p-5 text-white">
      <PostContent
        post={post}
        isLiked={isLiked}
        likeCount={likeCount}
        postId={id}
      />
      <CommentList postId={id} commentList={comments} />
      <CommentForm postId={id} />
    </div>
  )
}