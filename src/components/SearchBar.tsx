import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  buttonLabel?: string;
};

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  buttonLabel,
}: SearchBarProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
      className="flex w-full items-center gap-3 rounded-full border border-portal/30 bg-white px-5 py-2 shadow"
    >
      <Search size={20} className="text-ink/60" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent py-2 outline-none"
      />
      {/* Tombol hanya tampil kalau buttonLabel diisi (dipakai di Home) */}
      {buttonLabel && (
        <button
          type="submit"
          className="rounded-full bg-portal px-8 py-2 font-medium text-ink"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
};

export default SearchBar;