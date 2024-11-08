// app/page.tsx
import { Box, Container, Typography } from "@mui/material";
import { SearchBar } from "@/components/SearchBar";
import PostCard from "@/components/PostCard";
import { PostForm } from "@/components/PostForm";
import { supabase } from "@/lib/supabase";
import { AuthGuard } from "@/components/AuthGuard";

async function getPosts() {
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

  if (error) throw error;
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <AuthGuard>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            ブログ記事一覧
          </Typography>
          <SearchBar />
          <Box mt={4}>
            {posts && posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <Typography>No posts found</Typography>
            )}
          </Box>
        </Box>
        <PostForm />
      </Container>
    </AuthGuard>
  );
}
