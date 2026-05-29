"use client";

import { SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import TextareaAutosize from "react-textarea-autosize";

export default function DashboardChatPage() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center overflow-auto px-6">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Hello 👋
        </h1>

        <p className="mt-4 text-sm leading-7 text-secondary">
          What should we think through today?
        </p>

        <form className="mt-8">
          <div
            className="
              flex items-end gap-2 rounded-2xl border border-border
              bg-card px-3 py-3
              transition-colors focus-within:border-accent
            "
          >
            <TextareaAutosize
              minRows={1}
              maxRows={8}
              placeholder="Ask anything..."
              className="
                max-h-40 flex-1 resize-none bg-transparent
                px-1 py-1 text-sm text-foreground
                outline-none placeholder:text-secondary/60
              "
            />

            <button
              type="submit"
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-primary text-light-neutral
                transition-all hover:opacity-90
              "
            >
              <HugeiconsIcon icon={SentIcon} size={18} strokeWidth={1.8} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
