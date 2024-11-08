// components/BackButton.tsx
"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="outlined">
      Back
    </Button>
  );
}
