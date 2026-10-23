import { Globe } from "lucide-react";
import BackButton from "../../components/BackButton";
import Loading from "../../components/Loading";
import useFetch from "../../lib/useFetch";
import { getAvatarFromCharacterUrl } from "../../lib/utils";
import type { Location as LocationData } from "../../lib/types";
import CharacterList from "../characters/CharacterList";

type LocationDetailProps = {
  id?: string;
};

const LocationDetail = ({ id }: LocationDetailProps) => {
  const {
    data: location,
    loading,
    error,
  } = useFetch<LocationData>(`/location/${id}`);

  if (loading) return <Loading />;

  if (error || !location) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="text-ink/70">{error ?? "Lokasi tidak ditemukan."}</div>
        <BackButton label="Back to Locations" fallbackTo="/location" />
      </div>
    );
  }

  // API tidak punya gambar lokasi, jadi memakai gambar penghuni pertama (kalau ada)
  const cover = getAvatarFromCharacterUrl(location.residents[0]);

  const details = [
    { label: "Type", value: location.type || "-" },
    { label: "Dimension", value: location.dimension || "-" },
    { label: "Residents", value: String(location.residents.length) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="font-title text-4xl font-bold text-ink">Location Detail</div>
      <div className="rounded-3xl border border-portal/30 bg-paper p-6 shadow-lg md:p-8">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {cover ? (
            <img
              src={cover}
              alt={location.name}
              className="w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-portal/20 text-portal-dark">
              <Globe size={64} />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="font-title text-3xl font-bold text-ink">
              {location.name}
            </div>

            <div className="flex flex-col gap-2">
              {details.map((item) => (
                <div key={item.label} className="flex gap-4 text-sm">
                  <div className="w-24 text-ink/60">{item.label}</div>
                  <div className="font-medium text-ink">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <BackButton label="Back to Locations" fallbackTo="/location" />
            </div>
          </div>
        </div>
      </div>

      <div className="font-title text-2xl font-bold text-ink">
        Residents ({location.residents.length})
      </div>

      <CharacterList characterUrls={location.residents} />
    </div>
  );
};

export default LocationDetail