// app/page.tsx
import { Box, Container, Grid, Typography } from "@mui/material";
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
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4, md: 6 } }}>
        {/* ヘッダーセクション */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            ブログ記事一覧
          </Typography>
          <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
            <SearchBar />
          </Box>
        </Box>

        {/* 記事一覧セクション */}
        <Grid container spacing={3}>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Box
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <PostCard post={post} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  記事が見つかりませんでした
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* 投稿フォーム */}
        <Box sx={{ mt: 6 }}>
          <PostForm />
        </Box>
      </Container>
    </AuthGuard>
  );
}
