import { Inter } from "next/font/google";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-screen h-screen bg-gray-300">
      <Main />
    </main>
  );
}
