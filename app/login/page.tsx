// app/login/page.tsx
"use client";

import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/");
    } catch (err) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ログイン
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="メールアドレス"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="パスワード"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            ログイン
          </Button>
          <Box mt={2}>
            <Link href="/signup">アカウントをお持ちでない方はこちら</Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
