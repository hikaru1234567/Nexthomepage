// 8. 検索バーコンポーネント (components/SearchBar.tsx)
"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length > 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <TextField
      fullWidth
      placeholder="記事を検索..."
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
