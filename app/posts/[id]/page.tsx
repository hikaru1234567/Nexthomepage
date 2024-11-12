// app/posts/[id]/page.tsx

import { Box, Container, Typography } from "@mui/material";
import { CommentForm } from "@/components/Comments";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";

async function getPost(id: string) {
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles(id, name, email),
      comments(count)
    `
    )
    .eq("id", id) // idに基づいて単一の投稿を取得
    .single(); // 単一の投稿データを取得

  if (error) {
    throw new Error("Failed to fetch post");
  }

  return post;
}

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: BlogPost = await getPost(params.id);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            コメント
          </Typography>
          <CommentForm postId={post.id} />
        </Box>
      </Box>
    </Container>
  );
}
