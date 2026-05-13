import { cn } from "@/lib/cn";

interface NewsletterProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  surface?: "high" | "low";
  className?: string;
}

export function Newsletter({
  eyebrow,
  title = "Join the Inner Circle",
  body = "Be the first to access new collections, editorial journal entries, and private events in Nairobi.",
  surface = "high",
  className,
}: NewsletterProps) {
  return (
    <section
      className={cn(
        "py-section-gap px-margin-mobile md:px-margin-desktop text-center",
        surface === "high"
          ? "bg-surface-container-highest"
          : "bg-surface-container-low border-y border-outline-variant",
        className,
      )}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-stack-md">
        {eyebrow && (
          <span className="font-label-caps text-tertiary">{eyebrow}</span>
        )}
        <h2 className="font-display italic text-[40px] md:text-[56px] leading-[1.15]">
          {title}
        </h2>
        <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant max-w-xl">
          {body}
        </p>
        <form
          className="w-full max-w-lg flex flex-col md:flex-row mt-stack-md"
          aria-label="Newsletter signup"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="ENTER YOUR EMAIL"
            className="flex-grow bg-background border border-outline-variant px-6 py-4 font-label-caps text-on-surface placeholder:text-on-tertiary/40 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="bg-primary-container text-on-tertiary-container font-label-caps px-10 py-4 hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
