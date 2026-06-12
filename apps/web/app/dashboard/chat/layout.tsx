"use client";

import ChatHeader from "@/components/dashboard/chat/chat-header";
import ChatSidebar from "@/components/dashboard/chat/chat-sidebar";
import { useState } from "react";

export default function DashboardChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="relative flex h-screen flex-1 flex-col overflow-hidden border-l border-border">
      <ChatHeader onHistoryClick={() => setHistoryOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <ChatSidebar />
        <div className="min-w-0 flex-1 border-l border-border">{children}</div>
      </div>

      {historyOpen && (
        <div className="absolute inset-x-0 bottom-0 top-12 z-40 flex lg:hidden">
          <ChatSidebar mobile onNavigate={() => setHistoryOpen(false)} />
          <button
            type="button"
            className="flex-1 bg-black/10"
            aria-label="Close conversation history"
            onClick={() => setHistoryOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
