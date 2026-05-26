import Logo from "@/components/logo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen font-geist">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="my-10">
          <Logo />
        </div>

        <p className="mb-4 text-sm font-medium text-accent">
          Your AI assistant that remembers
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-primary">
          Turn scattered knowledge into AI memory.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-secondary">
          Bring together your notes, chats, documents, ideas, and projects into
          one personal workspace that helps you remember, reason, and build with
          context.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/auth">
            <button className="rounded-xl px-5 py-3 font-medium text-light-neutral hover:bg-primary-hover bg-linear-to-b from-secondary to-primary-hover shadow-[inset_0_1px_0_0_rgba(0,0,0,0.1)] cursor-pointer">
              Get started
            </button>
          </Link>

          <Link href="/demo">
            <button className="rounded-xl border border-border bg-card px-5 py-3 font-medium text-primary hover:bg-muted cursor-pointer">
              View demo
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
