"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/data/site";
import { ROLES } from "@/data/roles";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#journey", label: "Journey" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          {SITE.name.split(" ")[0]}
          <span>{SITE.name.split(" ")[1]}</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
        </button>
        <nav id="site-nav" className={cn("nav-links", open && "is-open")}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(pathname === link.href && "is-active")}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <details className="nav-roles">
            <summary>Roles</summary>
            <div>
              {ROLES.map((role) => (
                <Link
                  key={role.id}
                  href={role.href}
                  onClick={() => setOpen(false)}
                >
                  {role.title}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
