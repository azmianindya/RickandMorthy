import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type DataCardProps = {
  image?: string;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  buttonLabel?: string;
  variant?: "vertical" | "horizontal";
  onView: () => void;
};

const DataCard = ({
  image,
  title,
  subtitle,
  badge,
  buttonLabel = "View Detail",
  variant = "vertical",
  onView,
}: DataCardProps) => {
  // Varian horizontal dipakai untuk daftar Episodes: seluruh kartu bisa diklik
  if (variant === "horizontal") {
    return (
      <button
        type="button"
        onClick={onView}
        className="flex w-full items-center gap-4 rounded-2xl border border-portal/30 bg-paper p-3 text-left shadow transition hover:-translate-y-0.5"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="size-20 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="size-20 shrink-0 rounded-xl bg-portal/20" />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="truncate font-title text-lg font-bold text-ink">
            {title}
          </div>
          {subtitle && <div className="text-sm text-ink/60">{subtitle}</div>}
          {badge}
        </div>

        <ChevronRight className="shrink-0 text-portal-dark" />
      </button>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-portal/30 bg-paper shadow">
      {image ? (
        <img
          src={image}
          alt={title}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="aspect-square w-full bg-portal/20" />
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="font-title text-lg font-bold leading-tight text-ink">
          {title}
        </div>
        {badge}
        {subtitle && <div className="text-sm text-ink/70">{subtitle}</div>}

        <button
          type="button"
          onClick={onView}
          className="mt-auto rounded-full bg-portal/30 py-2 text-sm font-medium text-portal-dark"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default DataCard