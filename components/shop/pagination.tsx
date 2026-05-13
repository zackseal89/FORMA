export function Pagination({
  currentPage = 1,
  totalPages = 3,
}: {
  currentPage?: number;
  totalPages?: number;
}) {
  return (
    <nav
      aria-label="Catalog pagination"
      className="mt-section-gap flex justify-center items-center gap-stack-lg"
    >
      <button
        className="font-label-caps text-on-surface-variant hover:text-primary transition-colors disabled:opacity-40"
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <div className="flex gap-stack-md">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <span
            key={p}
            className={`font-label-caps ${
              p === currentPage
                ? "text-primary border-b border-primary"
                : "text-on-surface-variant"
            }`}
          >
            {String(p).padStart(2, "0")}
          </span>
        ))}
      </div>
      <button
        className="font-label-caps text-on-surface-variant hover:text-primary transition-colors disabled:opacity-40"
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}
