"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const conversationGroups = [
  {
    label: "Quarry",
    conversations: [
      {
        title: "Product scope and next milestone",
        href: "/dashboard/chat/project-review",
      },
      {
        title: "Memory ranking approaches",
        href: "/dashboard/chat/memory-ranking",
      },
      {
        title: "Navigation and workspace model",
        href: "/dashboard/chat/workspace-navigation",
      },
    ],
  },
  {
    label: "Freeform",
    conversations: [
      {
        title: "Thinking system ideas",
        href: "/dashboard/chat/thinking-system",
      },
    ],
  },
];

export default function ChatSidebar({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`${mobile ? "h-full w-72 border-r border-border" : "hidden h-full w-56 lg:block"} shrink-0 bg-surface-subtle`}
      aria-label="Conversation history"
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-3">
          <p className="px-2 text-xs font-medium text-secondary">
            Conversations
          </p>
          <Link
            href="/dashboard/chat"
            onClick={onNavigate}
            className="mt-3 block w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            + New conversation
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {conversationGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex === 0 ? "" : "mt-5"}>
              <p className="px-2 text-xs font-medium text-secondary">
                {group.label}
              </p>
              <ul className="mt-1 space-y-0.5">
                {group.conversations.map((conversation) => {
                  const active = pathname === conversation.href;
                  return (
                    <li key={conversation.href}>
                      <Link
                        href={conversation.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={`block rounded-md px-2 py-2 text-xs leading-5 ${
                          active
                            ? "bg-muted font-medium text-foreground"
                            : "text-secondary hover:bg-muted/60 hover:text-foreground"
                        }`}
                      >
                        <span className="block truncate">
                          {conversation.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
