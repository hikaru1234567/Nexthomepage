// components/PostList.tsx
import { useState } from "react";
import { Grid, Pagination, Box, Chip, IconButton } from "@mui/material";
import {
  ThumbUpOutlined,
  ThumbUp,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";
import PostCard from "./PostCard";
import { BlogPost } from "@/types/blog";

interface PostListProps {
  posts: BlogPost[];
  postsPerPage?: number;
}

export const PostList = ({ posts, postsPerPage = 6 }: PostListProps) => {
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (page - 1) * postsPerPage;
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const displayedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const toggleLike = (postId: string) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleBookmark = (postId: string) => {
    setBookmarks((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {displayedPosts.map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
            <Box
              sx={{
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
              }}
            >
              <PostCard
                post={post}
                actions={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Box>
                      <IconButton onClick={() => toggleLike(post.id)}>
                        {likes[post.id] ? (
                          <ThumbUp color="primary" />
                        ) : (
                          <ThumbUpOutlined />
                        )}
                      </IconButton>
                      <IconButton onClick={() => toggleBookmark(post.id)}>
                        {bookmarks[post.id] ? (
                          <Bookmark color="primary" />
                        ) : (
                          <BookmarkBorder />
                        )}
                      </IconButton>
                    </Box>
                    {post.tags && (
                      <Box>
                        {post.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5 }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                }
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};
