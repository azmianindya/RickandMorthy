type StatusBadgeProps = {
  status: string;
};

const STYLES: Record<string, string> = {
  alive: "text-portal-dark",
  dead: "text-red-500",
  unknown: "text-gray-500",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const key = status.toLowerCase();
  const label = key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium ${STYLES[key] ?? STYLES.unknown}`}
    >
      {/* bg-current memakai warna teks di atas */}
      <div className="size-2 rounded-full bg-current" />
      {label}
    </div>
  );
};

export default StatusBadge;