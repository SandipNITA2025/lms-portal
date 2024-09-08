import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
     Home Page
    </main>
  );
}
