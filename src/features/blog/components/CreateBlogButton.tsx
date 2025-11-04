"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuthStores"; // Impor store Anda
import { fadeInUp } from "@/lib/animations";

export function CreateBlogButton() {
  const router = useRouter();
  const { user } = useAuthStore(); // Dapatkan state user

  // Jika user tidak login (objectId kosong), jangan tampilkan tombol sama sekali.
  // Tidak perlu useEffect atau state loading di sini.
  if (!user.objectId) {
    return null;
  }

  // Arahkan ke rute yang benar
  const handleClick = () => {
    router.push("/blog/create"); // Rute Anda adalah /blog/create
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        onClick={handleClick}
        size="lg"
        className="bg-[#CBEA7B] text-[#234338] hover:bg-[#B8D96D] shadow-lg rounded-full px-6 py-6 gap-2"
      >
        <PlusCircle className="w-5 h-5" />
        Create Blog
      </Button>
    </motion.div>
  );
}
