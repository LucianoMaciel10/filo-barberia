import { ChevronLeft, ChevronRight } from "lucide-react";

function getItems(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [...new Set([1, page - 1, page, page + 1, total])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  const items = [];
  pages.forEach((n, index) => {
    if (index > 0 && n - pages[index - 1] > 1) items.push(`gap-${n}`);
    items.push(n);
  });
  return items;
}

const base =
  "flex size-9 items-center justify-center rounded-lg text-sm transition-colors sm:size-10";

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Paginación">
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
            className={`${base} cursor-pointer hover:bg-arena disabled:cursor-not-allowed disabled:text-charcoal/30 disabled:hover:bg-transparent`}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        </li>

        {getItems(page, totalPages).map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-label={`Página ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={`${base} cursor-pointer ${
                  item === page
                    ? "bg-dorado font-semibold"
                    : "border border-borde bg-white hover:border-dorado"
                }`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="px-1 text-charcoal/50">
              …
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => onChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Página siguiente"
            className={`${base} cursor-pointer hover:bg-arena disabled:cursor-not-allowed disabled:text-charcoal/30 disabled:hover:bg-transparent`}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
