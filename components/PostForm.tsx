// components/PostForm.tsx
"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { createPost } from "@/lib/operations";

interface PostFormProps {
  authorId: string;
  onSuccess?: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ authorId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createPost({
        title,
        content,
        authorId,
      });

      setSuccess(true);
      setTitle("");
      setContent("");
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿の作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          新規投稿を作成
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="タイトル"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="本文"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "投稿中..." : "投稿する"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          投稿が完了しました！
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
