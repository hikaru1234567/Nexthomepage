// components/PostCard.tsx
"use client";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography color="text.secondary">
          By {post.author?.name || "Anonymous"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {post.content?.substring(0, 150)}...
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {new Date(post.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} href={`/posts/${post.id}`} size="small">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
