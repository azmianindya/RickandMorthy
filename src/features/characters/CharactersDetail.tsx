import BackButton from "../../components/BackButton";
import Loading from "../../components/Loading";
import StatusBadge from "../../components/StatusBadge";
import useFetch from "../../lib/useFetch";
import type { Character } from "../../lib/types";

type CharactersDetailProps = {
  id?: string;
};

const CharactersDetail = ({ id }: CharactersDetailProps) => {
  console.log("ID yang diterima:", id);
  const {
    data: character,
    loading,
    error,
  } = useFetch<Character>(`/character/${id}`);

  if (loading) return <Loading />;

  if (error || !character) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="text-ink/70">
          {error ?? "Character tidak ditemukan."}
        </div>
        <BackButton label="Back to Characters" fallbackTo="/characters" />
      </div>
    );
  }

  const details = [
    { label: "Status", value: character.status },
    { label: "Species", value: character.species },
    { label: "Gender", value: character.gender },
    { label: "Type", value: character.type || "—" },
    { label: "Origin", value: character.origin.name },
    { label: "Location", value: character.location.name },
    { label: "Episodes", value: String(character.episode.length) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="font-title text-4xl font-bold text-ink">
        Character Detail
      </div>

      <div className="rounded-3xl border border-portal/30 bg-paper p-6 shadow-lg md:p-8">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <img
            src={character.image}
            alt={character.name}
            className="w-full rounded-2xl object-cover"
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="font-title text-3xl font-bold text-ink">
                {character.name}
              </div>
              <StatusBadge status={character.status} />
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
              <BackButton
                label="Back to Characters"
                fallbackTo="/characters"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharactersDetail