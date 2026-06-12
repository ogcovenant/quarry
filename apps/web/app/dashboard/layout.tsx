import Sidebar from "@/components/dashboard/siderbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="min-w-0 flex-1 pb-16 md:pb-0">{children}</main>
    </div>
  );
}
