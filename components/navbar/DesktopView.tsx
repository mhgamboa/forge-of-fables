import React from "react";
import Link from "next/link";
import { navLinks } from "./Navbar";

export default function DesktopView() {
  return (
    <nav className="ml-auto hidden lg:flex gap-6">
      {navLinks.map(link => (
        <Link
          key={link.name}
          href={link.href}
          prefetch={link.prefetch}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}