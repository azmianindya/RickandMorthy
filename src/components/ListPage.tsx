import type { ReactNode } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Loading from "./Loading";

type ListPageProps = {
  title: string;
  subtitle: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  searchPlaceholder: string;
  filters?: ReactNode;
  count?: number;
  countLabel: string;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  gridClassName?: string;
  children: ReactNode;
};

const ListPage = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder,
  filters,
  count,
  countLabel,
  loading,
  error,
  isEmpty,
  page,
  totalPages,
  onPageChange,
  gridClassName = "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
  children,
}: ListPageProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="font-title text-4xl font-bold text-ink">{title}</div>
        <div className="text-sm text-ink/70">{subtitle}</div>
      </div>

      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        placeholder={searchPlaceholder}
      />

      <div className="flex flex-wrap items-center gap-3">
        {filters}
        {count !== undefined && (
          <div className="text-sm text-ink/60">
            {count} {countLabel}
          </div>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="py-10 text-center text-red-500">{error}</div>
      ) : isEmpty ? (
        <div className="py-10 text-center text-ink/60">
          Tidak ada hasil yang cocok.
        </div>
      ) : (
        <>
          <div className={gridClassName}>{children}</div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default ListPage