// 7. コメントコンポーネント (components/CommentForm.tsx)
import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface CommentFormData {
  content: number;
}

export function CommentForm({ postId }: { postId: number }) {
  const { register, handleSubmit, reset } = useForm<CommentFormData>();

  const onSubmit = async (data: CommentFormData) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, postId }),
      });
      if (response.ok) {
        reset();
      }
    } catch (error) {
      console.error("コメントエラー:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        {...register("content")}
        label="コメント"
        multiline
        rows={2}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        コメントする
      </Button>
    </Box>
  );
}
