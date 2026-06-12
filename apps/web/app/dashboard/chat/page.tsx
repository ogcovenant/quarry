"use client";

import ChatComposer from "@/components/dashboard/chat/chat-composer";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

const prompts = [
  "Review the Quarry project and propose the next milestone",
  "Update the product direction note with project scoping",
  "Create a product brief note from the selected context",
];

export default function DashboardChatPage() {
  const router = useRouter();
  return (
    <div className="flex h-full overflow-y-auto">
      <div className="mx-auto my-auto w-full max-w-2xl px-6 py-12 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Ask Quarry
        </h1>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Select a project, note, or source as context. Quarry can answer
          questions and propose note changes for review.
        </p>
        <div className="mt-8">
          <ChatComposer
            onSubmit={() => router.push("/dashboard/chat/project-review")}
          />
        </div>
        <div className="mt-8">
          <p className="text-xs font-medium text-secondary">Try asking</p>
          <div className="mt-2 border-t border-border">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => router.push("/dashboard/chat/project-review")}
                className="flex w-full items-center gap-3 border-b border-border py-3 text-left text-sm text-secondary hover:bg-muted/40 hover:text-foreground"
              >
                <span className="flex-1">{prompt}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={14}
                  strokeWidth={1.7}
                />
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-secondary">
          Creates and updates require review. Deletes always require
          confirmation.
        </p>
      </div>
    </div>
  );
}
