// 4. lib/supabase/operations.ts を作成

import { supabase } from "./supabase";

// 単一の投稿を作成
export async function createPost({
  title,
  content,
  authorId,
}: {
  title: string;
  content: string;
  authorId: string;
}) {
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        content,
        author_id: authorId,
        created_at: new Date().toISOString(),
      },
    ])
    .select("*, author:profiles(*)")
    .single();

  if (error) throw error;
  return data;
}

// コメントを作成
export async function createComment({
  postId,
  content,
  authorId,
}: {
  postId: string;
  content: string;
  authorId: string;
}) {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        content,
        author_id: authorId,
        created_at: new Date().toISOString(),
      },
    ])
    .select("*, author:profiles(*)")
    .single();

  if (error) throw error;
  return data;
}

// ユーザープロフィールを作成/更新
export async function upsertProfile({
  userId,
  name,
  email,
}: {
  userId: string;
  name: string;
  email: string;
}) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert([
      {
        id: userId,
        name,
        email,
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 複数の投稿を一括作成
export async function bulkInsertPosts(
  posts: Array<{
    title: string;
    content: string;
    authorId: string;
  }>
) {
  const { data, error } = await supabase
    .from("posts")
    .insert(
      posts.map((post) => ({
        title: post.title,
        content: post.content,
        author_id: post.authorId,
        created_at: new Date().toISOString(),
      }))
    )
    .select("*, author:profiles(*)");

  if (error) throw error;
  return data;
}
