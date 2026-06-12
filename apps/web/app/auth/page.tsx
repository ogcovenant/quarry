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
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8 sm:py-12">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Go to Quarry home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-foreground"
          >
            <HugeiconsIcon
              icon={ArrowLeft03Icon}
              size={16}
              strokeWidth={1.7}
            />
            Back
          </Link>
        </header>

        <section className="my-auto py-16">
          <p className="text-sm text-secondary">Personal memory workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {isSignIn ? "Welcome back." : "Create your workspace."}
          </h1>
          <p className="mt-3 text-sm leading-6 text-secondary">
            {isSignIn
              ? "Sign in to continue working with your notes and sources."
              : "Start bringing your notes, projects, and sources into context."}
          </p>

          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-secondary/60 focus:border-secondary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  required
                  className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-secondary/60 focus:border-secondary"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </button>

            <p className="mt-5 text-center text-xs leading-5 text-secondary">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="font-medium text-foreground hover:underline"
                onClick={toggleFormType}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </button>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
