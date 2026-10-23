import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

// Menyusun nomor halaman yang ditampilkan: 1 2 3 4 5 ... 42
const getPages = (page: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (page >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", page - 1, page, page + 1, "...", total];
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Halaman sebelumnya"
        className="flex size-9 items-center justify-center rounded-full text-ink/70 disabled:opacity-30"
      >
        <ChevronLeft size={18} />
      </button>

      {getPages(page, totalPages).map((item, index) =>
        item === "..." ? (
          <div key={`dots-${index}`} className="px-1 text-ink/50">
            ...
          </div>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`size-9 rounded-full text-sm font-medium ${
              item === page ? "bg-portal text-ink" : "text-ink/70"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Halaman berikutnya"
        className="flex size-9 items-center justify-center rounded-full text-ink/70 disabled:opacity-30"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination