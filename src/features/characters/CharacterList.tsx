import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import DataCard from "../../components/DataCard";
import Loading from "../../components/Loading";
import StatusBadge from "../../components/StatusBadge";
import useFetch from "../../lib/useFetch";
import { getIdFromUrl } from "../../lib/utils";
import type { Character } from "../../lib/types";

type CharacterListProps = {
  characterUrls: string[];
};

// Jumlah kartu yang tampil per tahap, sisanya dibuka lewat tombol Show more
const PAGE_SIZE = 20;

const CharacterList = ({ characterUrls }: CharacterListProps) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Semua id karakter digabung jadi satu request: /character/1,2,3
  const ids = characterUrls.map(getIdFromUrl).join(",");

  // Kalau tidak ada karakter, request tidak dijalankan (endpoint null)
  const { data, loading, error } = useFetch<Character | Character[]>(
    ids ? `/character/${ids}` : null
  );

  if (characterUrls.length === 0) {
    return (
      <div className="py-6 text-center text-ink/60">Belum ada karakter.</div>
    );
  }

  if (loading) return <Loading />;

  if (error || !data) {
    return (
      <div className="py-6 text-center text-red-500">
        Gagal memuat karakter.
      </div>
    );
  }

  // API mengembalikan array kalau id lebih dari satu, dan objek kalau hanya satu
  const characters = Array.isArray(data) ? data : [data];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {characters.slice(0, visible).map((character) => (
          <DataCard
            key={character.id}
            image={character.image}
            title={character.name}
            badge={<StatusBadge status={character.status} />}
            subtitle={character.species}
            onView={() =>
              navigate({
                to: "/characters/$id",
                params: { id: String(character.id) },
              })
            }
          />
        ))}
      </div>

      {visible < characters.length && (
        <button
          type="button"
          onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
          className="mx-auto rounded-full bg-portal px-8 py-2 text-sm font-medium text-ink"
        >
          Show more ({characters.length - visible} lagi)
        </button>
      )}
    </div>
  );
};

export default CharacterList