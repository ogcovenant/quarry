"use client";

import ChatHeader from "@/components/dashboard/chat/chat-header";
import ChatSidebar from "@/components/dashboard/chat/chat-sidebar";

export default function DashboardChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-1 flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex min-h-0 flex-1">
        <ChatSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
