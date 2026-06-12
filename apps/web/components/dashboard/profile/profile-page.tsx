export default function ProfilePageDetails() {
  return (
    <section className="mt-10 max-w-xl">
      <form className="border-t border-border pt-6">
        <h2 className="text-sm font-semibold text-foreground">
          Change password
        </h2>
        <p className="mt-1 text-sm leading-6 text-secondary">
          Use a unique password you do not use for another service.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="current-password"
              className="text-sm font-medium text-foreground"
            >
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter current password"
              className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none placeholder:text-secondary/60 focus:border-secondary"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-foreground"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter new password"
              className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none placeholder:text-secondary/60 focus:border-secondary"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none placeholder:text-secondary/60 focus:border-secondary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Update password
        </button>
      </form>
    </section>
  );
}
