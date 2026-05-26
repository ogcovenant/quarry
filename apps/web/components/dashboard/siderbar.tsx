import { HugeiconsIcon } from "@hugeicons/react";
import Logo from "../logo";
import { HandPointingLeft03Icon } from "@hugeicons/core-free-icons";

export default function Sidebar() {
  const navItems = [
    { label: "Chat", href: "/dashboard/chat" },
    { label: "Notes", href: "/dashboard/notes" },
    { label: "Favorites", href: "/dashboard/favorites" },
  ];

  const bottomNavItems = [{ label: "Profile", href: "/profile" }];

  const activeItem = navItems[0];

  return (
    <div className="p-5 border-r-2 border-r-border w-[10%] min-h-screen flex flex-col">
      <Logo />
      <section className="flex flex-1 flex-col justify-between">
        <section className="mt-10">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index} className="flex gap-3 items-center">
                <a href={item.href}>{item.label}</a>
                {activeItem === item && (
                  <HugeiconsIcon icon={HandPointingLeft03Icon} />
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-5">
          <ul className="space-y-2">
            {bottomNavItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
