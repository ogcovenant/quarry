"use client";

import Logo from "@/components/logo";
import { ArrowLeft03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

enum FORM_TYPE {
  SIGN_UP = "sign-up",
  SIGN_IN = "sign-in",
}

export default function GetStartedPage() {
  const [formType, setFormType] = useState<FORM_TYPE>(FORM_TYPE.SIGN_IN);
  const isSignIn = formType === FORM_TYPE.SIGN_IN;

  const toggleFormType = () => {
    setFormType(isSignIn ? FORM_TYPE.SIGN_UP : FORM_TYPE.SIGN_IN);
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 py-24">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Go to Quarry home">
            <Logo />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-primary transition hover:bg-muted"
          >
            <HugeiconsIcon icon={ArrowLeft03Icon} />
            <span>Back</span>
          </Link>
        </header>

        <section className="py-5 ">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">
              Start building memory
            </p>
          </div>

          <form className="mt-2">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-secondary/60 focus:border-accent focus:bg-card"
                  placeholder="touchgrass@internet.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-primary"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  required
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-secondary/60 focus:border-accent focus:bg-card"
                  placeholder="👻👻👻👻👻👻👻👻"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-linear-to-b from-secondary to-primary-hover px-5 py-3 font-medium text-light-neutral shadow-[inset_0_1px_0_0_rgba(0,0,0,0.1)] transition hover:bg-primary-hover cursor-pointer"
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </button>

            <p className="mt-5 text-center text-xs leading-5 text-secondary">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="font-medium text-primary cursor-pointer"
                onClick={toggleFormType}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </span>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
