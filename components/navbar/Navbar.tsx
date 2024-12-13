"use client";
// TODO: Update Shadcn Sonner?

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { CircleArrowLeft, Menu, Mountain } from "lucide-react";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import InitiativeModal from "@/app/run-encounter/[encounterId]/(components)/initiative-modal/InitiativeModal";

export const navLinks = [
  { name: "My Encounters", href: "/my-encounters", prefetch: true },
  { name: "My Monsters", href: "/my-monsters", prefetch: false },
  { name: "Import Monster", href: "/import-monster", prefetch: true },
];

export default function Component() {
  const pathname = usePathname();
  const runEncounter = pathname.startsWith("/run-encounter");
  if (runEncounter) return;

  return (
    <header className="flex flex-row-reverse lg:flex-row h-16 w-full shrink-0 items-center px-4 md:px-6 border-b border-b-foreground/10">
      <MobileView />
      <Link href="/" className="mr-6 lg:flex" prefetch>
        {/* Replace With Logo: */}
        <Mountain className="h-6 w-6" />
        <span className="sr-only">Forge of Fables</span>
      </Link>
      <DesktopView />
    </header>
  );
}
