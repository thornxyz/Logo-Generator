import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logo",
  description: "Generate your logo with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={hostGrotesk.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
