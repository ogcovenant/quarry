"use client";

import {
  ArrowDown01Icon,
  CloudUploadIcon,
  Folder01Icon,
  Note01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FormEvent, useMemo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const contextItems = [
  {
    id: "project-quarry",
    label: "Quarry",
    detail: "5 notes · 2 sources",
    group: "Projects",
    icon: Folder01Icon,
  },
  {
    id: "project-rodoh",
    label: "Rodoh",
    detail: "2 notes · 1 source",
    group: "Projects",
    icon: Folder01Icon,
  },
  {
    id: "note-direction",
    label: "Quarry Product Direction",
    detail: "Strategy note",
    group: "Notes",
    icon: Note01Icon,
  },
  {
    id: "note-brief",
    label: "Quarry v2 Product Brief",
    detail: "Brief note",
    group: "Notes",
    icon: Note01Icon,
  },
  {
    id: "source-research",
    label: "AI workspace research.md",
    detail: "Source",
    group: "Sources",
    icon: CloudUploadIcon,
  },
];

export default function ChatComposer({
  compact = false,
  onSubmit,
}: {
  compact?: boolean;
  onSubmit?: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [selectedIds, setSelectedIds] = useState(["project-quarry"]);
  const [contextOpen, setContextOpen] = useState(false);
  const selected = useMemo(
    () => contextItems.filter((item) => selectedIds.includes(item.id)),
    [selectedIds],
  );
  function toggle(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    onSubmit?.(message.trim());
    setMessage("");
  }

  return (
    <form onSubmit={submit} className="relative">
      {contextOpen && (
        <div className="absolute bottom-full left-0 z-30 mb-2 w-full max-w-sm rounded-lg border border-border bg-card p-2 shadow-lg">
          <p className="px-2 py-1 text-xs font-medium text-secondary">
            Use as context
          </p>
          {["Projects", "Notes", "Sources"].map((group) => (
            <div key={group}>
              <p className="px-2 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wide text-secondary/70">
                {group}
              </p>
              {contextItems
                .filter((item) => item.group === group)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={16}
                      strokeWidth={1.7}
                      className="text-secondary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">
                        {item.label}
                      </span>
                      <span className="block text-xs text-secondary">
                        {item.detail}
                      </span>
                    </span>
                    <span
                      className={`h-3.5 w-3.5 rounded-sm border ${selectedIds.includes(item.id) ? "border-primary bg-primary" : "border-border"}`}
                    />
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-within:border-secondary">
        <TextareaAutosize
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          minRows={compact ? 1 : 3}
          maxRows={8}
          placeholder="Ask Quarry..."
          className="max-h-48 w-full resize-none bg-transparent py-1 text-sm leading-6 text-foreground outline-none placeholder:text-secondary/60"
        />
        <div className="mt-1 flex items-center justify-between border-t border-border pt-2">
          <button
            type="button"
            onClick={() => setContextOpen((open) => !open)}
            className="inline-flex items-center gap-1.5 rounded px-1.5 py-1 text-xs text-secondary hover:bg-muted"
          >
            <Folder01IconLabel selected={selected} />
            <HugeiconsIcon icon={ArrowDown01Icon} size={13} strokeWidth={1.7} />
          </button>
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white"
          >
            <HugeiconsIcon icon={SentIcon} size={15} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </form>
  );
}

function Folder01IconLabel({ selected }: { selected: typeof contextItems }) {
  return (
    <>
      <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={1.7} />
      <span>
        {selected.length === 0
          ? "No context"
          : selected.length === 1
            ? selected[0]?.label
            : `${selected.length} items`}
      </span>
    </>
  );
}
