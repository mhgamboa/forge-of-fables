"use client";
import React from "react";
import Link from "next/link";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, encounterLinks } from "./Navbar";

export default function MobileView() {
  return (
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
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={link.prefetch}
            >
              <SheetClose>{link.name}</SheetClose>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
