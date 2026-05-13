"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Field = {
  key: string;
  label: string;
  hint: string;
  placeholder: string;
  secret?: boolean;
};

const DEFAULT_API_VERSION = "2026-04";

const FIELDS: Field[] = [
  {
    key: "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN",
    label: "Store domain",
    hint: "Your *.myshopify.com domain (not the custom domain).",
    placeholder: "forma.myshopify.com",
  },
  {
    key: "SHOPIFY_STOREFRONT_PRIVATE_TOKEN",
    label: "Private access token (server-only)",
    hint: "From Headless → Storefronts → your storefront → 'Private access token'. Sent via Shopify-Storefront-Private-Token header. Never ships to the browser. Preferred when present.",
    placeholder: "shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    secret: true,
  },
  {
    key: "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN",
    label: "Public access token (browser-safe)",
    hint: "From Headless → 'Public access token'. Sent via X-Shopify-Storefront-Access-Token. Designed to be exposed to the client. Use this if you don't have a private token.",
    placeholder: "shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    secret: true,
  },
  {
    key: "SHOPIFY_API_VERSION",
    label: "API version",
    hint: "Pinned to the latest stable. Leave as-is unless you know why.",
    placeholder: DEFAULT_API_VERSION,
  },
];

const DEFAULTS: Record<string, string> = {
  SHOPIFY_API_VERSION: DEFAULT_API_VERSION,
};

function renderEnv(
  values: Record<string, string>,
  options: { mask: boolean },
) {
  return FIELDS.map((f) => {
    const value = values[f.key] ?? "";
    const display =
      options.mask && f.secret && value
        ? "•".repeat(Math.min(value.length, 32))
        : value;
    return `${f.key}=${display}`;
  }).join("\n");
}

type PingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; shop: string; host: string }
  | { status: "error"; message: string };

export default function EnvPage() {
  const [values, setValues] = useState<Record<string, string>>(DEFAULTS);
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ping, setPing] = useState<PingState>({ status: "idle" });
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    },
    [],
  );

  const has = (key: string) => (values[key] ?? "").trim().length > 0;
  const allFilled =
    has("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN") &&
    (has("SHOPIFY_STOREFRONT_PRIVATE_TOKEN") ||
      has("NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN")) &&
    has("SHOPIFY_API_VERSION");

  const copy = async () => {
    await navigator.clipboard.writeText(renderEnv(values, { mask: false }));
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
  };

  const testConnection = async () => {
    setPing({ status: "loading" });
    try {
      const res = await fetch("/api/dev/shopify-ping", { cache: "no-store" });
      const data = await res.json();
      if (data.ok) {
        setPing({ status: "ok", shop: data.shop, host: data.host });
      } else {
        setPing({
          status: "error",
          message: data.message ?? "Unknown error",
        });
      }
    } catch (err) {
      setPing({
        status: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-on-surface/60">
          Forma · Setup
        </p>
        <h1 className="mt-2 font-serif text-4xl text-on-surface">
          Shopify environment
        </h1>
        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-on-surface/70">
          Paste your Headless channel credentials below. The page generates the
          exact <code className="font-mono text-xs">.env.local</code> block to
          copy into the repo root. Nothing is saved server-side.
        </p>
      </header>

      <section className="space-y-6">
        {FIELDS.map((f) => {
          const value = values[f.key] ?? "";
          const isSecret = f.secret && !reveal;
          return (
            <div key={f.key}>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor={f.key}
                  className="font-sans text-[12px] uppercase tracking-[0.15em] text-on-surface"
                >
                  {f.label}
                </label>
                <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface/50">
                  {f.key}
                </span>
              </div>
              <input
                id={f.key}
                type={isSecret ? "password" : "text"}
                autoComplete="off"
                spellCheck={false}
                value={value}
                placeholder={f.placeholder}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
                className={cn(
                  "mt-2 w-full bg-transparent",
                  "border-b border-on-surface/30 focus:border-on-surface",
                  "font-mono text-sm text-on-surface placeholder:text-on-surface/30",
                  "py-2 outline-none transition-colors",
                )}
              />
              <p className="mt-1.5 font-sans text-[11px] leading-relaxed text-on-surface/55">
                {f.hint}
              </p>
            </div>
          );
        })}

        <label className="flex items-center gap-2 pt-2 font-sans text-[12px] text-on-surface/70">
          <input
            type="checkbox"
            checked={reveal}
            onChange={(e) => setReveal(e.target.checked)}
            className="h-3 w-3 accent-on-surface"
          />
          Reveal secrets
        </label>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-[12px] uppercase tracking-[0.15em] text-on-surface">
            .env.local
          </h2>
          <button
            type="button"
            onClick={copy}
            disabled={!allFilled}
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.15em]",
              "border-b border-on-surface pb-0.5",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "transition-opacity hover:opacity-80",
            )}
          >
            {copied ? "Copied" : "Copy block"}
          </button>
        </div>
        <pre
          className={cn(
            "mt-3 overflow-x-auto rounded-sm",
            "border border-on-surface/15 bg-on-surface/5",
            "p-4 font-mono text-[12px] leading-relaxed text-on-surface",
          )}
        >
          {renderEnv(values, { mask: !reveal })}
        </pre>
        <ol className="mt-5 space-y-1.5 font-sans text-[12px] leading-relaxed text-on-surface/70">
          <li>1. Create <code className="font-mono text-[11px]">.env.local</code> in the repo root if it doesn&apos;t exist.</li>
          <li>2. Paste the block above. (Click <em>Copy block</em> — the real values are copied, not the masked ones.)</li>
          <li>3. Restart <code className="font-mono text-[11px]">npm run dev</code>. Next.js only reads env at start.</li>
          <li>4. Already gitignored via <code className="font-mono text-[11px]">.env*</code> in <code className="font-mono text-[11px]">.gitignore</code>.</li>
        </ol>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-[12px] uppercase tracking-[0.15em] text-on-surface">
            Test connection
          </h2>
          <button
            type="button"
            onClick={testConnection}
            disabled={ping.status === "loading"}
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.15em]",
              "border-b border-on-surface pb-0.5",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "transition-opacity hover:opacity-80",
            )}
          >
            {ping.status === "loading" ? "Pinging…" : "Run ping"}
          </button>
        </div>
        <p className="mt-3 font-sans text-[11px] leading-relaxed text-on-surface/55">
          Sends a <code className="font-mono text-[11px]">shop {`{ name }`}</code> query to <code className="font-mono text-[11px]">/api/dev/shopify-ping</code>, which reads <code className="font-mono text-[11px]">.env.local</code> server-side. Restart the dev server after editing env.
        </p>
        <div className="mt-4 min-h-[72px] rounded-sm border border-on-surface/15 bg-on-surface/5 p-4">
          {ping.status === "idle" && (
            <p className="font-mono text-[12px] text-on-surface/40">
              No ping yet.
            </p>
          )}
          {ping.status === "loading" && (
            <p className="font-mono text-[12px] text-on-surface/60">
              Contacting Shopify…
            </p>
          )}
          {ping.status === "ok" && (
            <div className="font-mono text-[12px] text-on-surface">
              <p>
                <span className="text-on-surface/50">ok</span>{" "}
                <span className="text-on-surface">·</span>{" "}
                <span>{ping.shop}</span>
              </p>
              <p className="text-on-surface/60">{ping.host}</p>
            </div>
          )}
          {ping.status === "error" && (
            <p className="font-mono text-[12px] leading-relaxed text-on-surface">
              <span className="text-on-surface/50">error</span>{" "}
              <span className="text-on-surface">·</span> {ping.message}
            </p>
          )}
        </div>
      </section>

      <footer className="mt-16 border-t border-on-surface/10 pt-6">
        <p className="font-sans text-[11px] leading-relaxed text-on-surface/50">
          Reference:{" "}
          <a
            href="https://shopify.dev/docs/api/storefront/latest"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-on-surface/80"
          >
            shopify.dev/docs/api/storefront/latest
          </a>
        </p>
      </footer>
    </div>
  );
}
