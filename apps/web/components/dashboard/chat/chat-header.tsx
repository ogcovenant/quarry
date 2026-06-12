import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function ChatHeader({
  onHistoryClick,
}: {
  onHistoryClick: () => void;
}) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onHistoryClick}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-secondary hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open conversation history"
        >
          <HugeiconsIcon icon={Menu01Icon} size={16} strokeWidth={1.7} />
          History
        </button>
        <Link
          href="/dashboard/chat"
          className="hidden text-sm font-medium text-foreground sm:block"
        >
          Ask
        </Link>
      </div>
      <span className="hidden text-xs text-secondary sm:block">
        Changes are reviewed before applying
      </span>
    </header>
  );
}
