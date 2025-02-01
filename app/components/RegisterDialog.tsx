"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterDialog() {
  return (
    <Link href="/register">
      <Button variant="outline">Registrera</Button>
    </Link>
  )
}

