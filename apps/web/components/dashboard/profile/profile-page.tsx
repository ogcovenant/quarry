export default function ProfilePageDetails() {
  return (
    <section className="flex flex-1 flex-col px-8 py-6">
      <div className="mx-auto w-full max-w-xl">
        <form className="rounded-lg border border-border bg-card/80 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Change Password
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground">
                Former Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-secondary/60 focus:border-accent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-secondary/60 focus:border-accent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-secondary/60 focus:border-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-light-neutral hover:opacity-90 bg-linear-to-b from-secondary to-primary"
          >
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
}
