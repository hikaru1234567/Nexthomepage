// app/layout.tsx
import { AuthProvider } from "@/components/AuthContext";
import NavigationBar from "@/components/NavigationBar";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <Providers>
            <NavigationBar />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
