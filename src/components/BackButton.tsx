import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  label: string;
  fallbackTo: "/characters" | "/episode" | "/location";
};

const BackButton = ({ label, fallbackTo }: BackButtonProps) => {
  const router = useRouter();
  const navigate = useNavigate();

  // Kembali ke halaman sebelumnya supaya search, filter, dan nomor halaman list tetap ada
  // Kalau halaman dibuka langsung dari link (tidak ada riwayat), pindah ke halaman list
  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      navigate({ to: fallbackTo });
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex w-fit items-center gap-2 rounded-full border border-portal/40 bg-white px-5 py-2 text-sm font-medium text-portal-dark"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackButton