"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/styles/theme";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
