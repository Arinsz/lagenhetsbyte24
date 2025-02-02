"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterDialog() {
  return (
    <Link href="/pages/register">
      <Button variant="outline">Registrera</Button>
    </Link>
  );
}
