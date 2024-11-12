"use client";

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
interface CommentFormData {
  content: string;
}

export function CommentForm({ postId }: { postId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
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
        fullWidth
        multiline
        rows={4}
        label="コメント"
        error={!!errors.content}
        helperText={errors.content?.message}
        {...register("content", {
          required: "コメントを入力してください",
          minLength: {
            value: 10,
            message: "10文字以上入力してください",
          },
        })}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        コメントする
      </Button>
    </Box>
  );
}
