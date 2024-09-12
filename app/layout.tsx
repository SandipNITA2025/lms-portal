import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "@/components/provider/toaster-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ConfettiProvider } from "@/components/provider/confetti-provider";
import TopLoader from "@/components/top-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnGo | Empower Your Learning with Engaging Online Courses",
  description: "LearnGo offers a powerful Learning Management System (LMS) designed to help individuals and organizations access engaging and effective online courses. Unlock your learning potential with our cutting-edge platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfettiProvider />
            <ToasterProvider />
            <TopLoader />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
