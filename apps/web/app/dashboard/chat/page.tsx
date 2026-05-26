"use client";

import ChatHeader from "@/components/dashboard/chat/chat-header";
import ChatPage from "@/components/dashboard/chat/chat-page";
import ChatSidebar from "@/components/dashboard/chat/chat-sidebar";

export default function DashboardChatPage() {
  return (
    <div className="flex h-screen flex-1 flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex min-h-0 flex-1">
        <ChatSidebar />
        <ChatPage />
      </div>
    </div>
  );
}
