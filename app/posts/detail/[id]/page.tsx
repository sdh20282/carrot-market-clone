import { notFound } from "next/navigation";

import PostContent from "./components/post-content";
import CommentSection from "./components/comment-section";

import { getCachedPost } from "@/lib/database/get-post"
import { getCachedCommentList } from "@/lib/database/get-comment-list";
import { getCachedLikedStatus } from "@/lib/database/get-is-liked";
import { getCachedNowUserInfo } from "@/lib/database/get-now-user-info";
import getPostIdList from "@/lib/database/get-post-id-list";

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

  const user = await getCachedNowUserInfo();

  if (!user) {
    return notFound();
  }

  const comments = await getCachedCommentList(id);
  const { isLiked, likeCount } = await getCachedLikedStatus(id);
  
  return (
    <div className="p-5 pb-24 text-white">
      <PostContent
        post={post}
        isLiked={isLiked}
        likeCount={likeCount}
      />
      <CommentSection postId={id} commentList={comments} user={user} />
    </div>
  )
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPostIdList();

  return posts.map(post => ({ id: post.id + "" }));
}