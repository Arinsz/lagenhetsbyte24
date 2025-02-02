"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterDialog() {
  return (
    <Link href="/pages/register">
      <Button className="bg-white text-black font-medium rounded-md px-6 py-2 text-base duration-300 hover:bg-white hover:underline">
        Skapa konto
      </Button>
    </Link>
  );
}
