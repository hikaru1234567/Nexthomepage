// components/NavigationBar.tsx
"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { signOut } from "@/lib/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavigationBar() {
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      handleClose();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = user
    ? [
        { label: "プロフィール", onClick: () => router.push("/profile") },
        { label: "ログアウト", onClick: handleLogout },
      ]
    : [
        { label: "ログイン", onClick: () => router.push("/login") },
        { label: "新規登録", onClick: () => router.push("/signup") },
      ];

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          ブログアプリ
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMobileMenu} edge="end">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleClose}
            >
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <IconButton onClick={handleMenu} color="inherit" sx={{ ml: 2 }}>
                  {user.user_metadata?.avatar_url ? (
                    <Avatar
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.name || "User avatar"}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={item.onClick}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} href="/login">
                  ログイン
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  href="/signup"
                >
                  新規登録
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
