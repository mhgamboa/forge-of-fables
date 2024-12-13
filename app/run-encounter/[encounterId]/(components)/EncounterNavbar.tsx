"use client";
// TODO: Update Shadcn Sonner?
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CircleArrowLeft, Menu, Mountain } from "lucide-react";
import InitiativeModal from "@/app/run-encounter/[encounterId]/(components)/initiative-modal/InitiativeModal";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

export default function EncounterNavbar() {
  return (
    <header className="flex flex-row-reverse lg:flex-row h-16 w-full shrink-0 items-center px-4 md:px-6 border-b border-b-foreground/10">
      {/* Mobile View */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              <Link href="/" className="mr-6  lg:flex" prefetch={false}>
                <SheetClose>
                  <Mountain className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </SheetClose>
              </Link>
            </SheetTitle>
            <SheetDescription className="sr-only">Navigate the mobile menu</SheetDescription>
          </SheetHeader>
          <div className="grid gap-2 py-6">
            <SheetClose>
              <InitiativeModal triggerClass="flex w-full items-center py-2 text-lg font-semibold" />
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link prefetch href="/" className="mr-6 lg:flex">
        <CircleArrowLeft className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {/* Desktop View */}
      <nav className="ml-auto hidden lg:flex gap-6">
        <InitiativeModal triggerClass="cursor-pointer group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50" />
      </nav>
    </header>
  );
}
