import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Lägenhetsbyte24
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link
            href="/sok-annonser"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Sök annonser
          </Link>
          <Link
            href="/sa-fungerar-det"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Så fungerar det
          </Link>
          <Link
            href="/nyheter-artiklar"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Nyheter & Artiklar
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Logga in</Button>
          <Button>Kom igång gratis</Button>
        </div>
      </div>
    </header>
  );
}
