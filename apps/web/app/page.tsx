import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-geist">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="flex items-center font-ibm my-10">
          <Image src="/logo.svg" alt="Quarry logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-semibold text-primary">
            Quarry
          </span>
        </h1>
        <p className="mb-4 text-sm font-medium text-accent">
          Your AI Workspace Assistant
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-primary">
          Quarry turns scattered team knowledge into durable company memory.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-secondary">
          Connect conversations, docs, agents, and projects into one structured
          workspace that understands what your team is building.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-xl bg-primary px-5 py-3 font-medium text-light-neutral hover:bg-primary-hover">
            Get started
          </button>

          <button className="rounded-xl border border-border bg-card px-5 py-3 font-medium text-primary hover:bg-muted">
            View demo
          </button>
        </div>
      </section>
    </main>
  );
}
