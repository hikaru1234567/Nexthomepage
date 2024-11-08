// app/posts/[id]/page.tsx

import { Box, Container, Typography } from "@mui/material";
import { CommentForm } from "@/components/Comments";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";

async function getPost() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles(id, name, email),
      comments(count)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch posts");
  }

  return posts;
}

export default async function PostPage() {
  const post: BlogPost = await getPost();

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
