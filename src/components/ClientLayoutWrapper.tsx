"use client";

import { ThemeProvider } from "next-themes";
import BackgroundDecoration from "./BackgroundDecoration";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BackgroundDecoration />
      {children}
    </ThemeProvider>
  );
}
