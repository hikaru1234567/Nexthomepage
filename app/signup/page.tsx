"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar,
  Paper,
} from "@mui/material";
import { signUp } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signUp(email, password, name);
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to the sign-in page after successful sign-up
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "サインアップに失敗しました"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          アカウント作成
        </Typography>
        <Box component="form" onSubmit={handleSignUp}>
          <TextField
            label="名前"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="メールアドレス"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="パスワード"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            サインアップ
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          サインアップに成功しました。サインインページにリダイレクトします。
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
}
