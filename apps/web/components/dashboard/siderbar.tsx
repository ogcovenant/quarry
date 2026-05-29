"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import Logo from "../logo";
import { HandPointingLeft03Icon } from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Chat", href: "/dashboard/chat" },
    { label: "Notes", href: "/dashboard/notes" },
    { label: "Uploads", href: "/dashboard/uploads" },
  ];

  const bottomNavItems = [{ label: "Profile", href: "/dashboard/profile" }];

  return (
    <div className="p-5 border-r-2 border-r-border w-[10%] min-h-screen flex flex-col">
      <Logo />

      <section className="flex flex-1 flex-col justify-between">
        <section className="mt-10">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={index} className="flex gap-3 items-center">
                  <a href={item.href}>{item.label}</a>

                  {isActive && <HugeiconsIcon icon={HandPointingLeft03Icon} />}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mb-5">
          <ul className="space-y-2">
            {bottomNavItems.map((item, index) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={index} className="flex gap-3 items-center">
                  <a href={item.href}>{item.label}</a>

                  {isActive && <HugeiconsIcon icon={HandPointingLeft03Icon} />}
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </div>
  );
}
