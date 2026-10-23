import type { ReactNode } from "react";

type InfoCardProps = {
  label: string;
  title: string;
  meta?: string;
  icon: ReactNode;
  onClick: () => void;
};

const InfoCard = ({ label, title, meta, icon, onClick }: InfoCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl border border-portal/30 bg-white p-4 text-left shadow transition hover:-translate-y-1"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-portal/20 text-portal-dark">
        {icon}
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="text-xs font-medium text-portal-dark">{label}</div>
        <div className="truncate font-title font-bold text-ink">{title}</div>
        {meta && <div className="text-xs text-ink/60">{meta}</div>}
      </div>
    </button>
  );
};

export default InfoCard