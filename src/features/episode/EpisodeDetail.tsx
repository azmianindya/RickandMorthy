import BackButton from "../../components/BackButton";
import Loading from "../../components/Loading";
import useFetch from "../../lib/useFetch";
import { getAvatarFromCharacterUrl } from "../../lib/utils";
import type { Episode } from "../../lib/types";
import CharacterList from "../characters/CharacterList";

type EpisodeDetailProps = {
  id?: string;
};

const EpisodeDetail = ({ id }: EpisodeDetailProps) => {
  const {
    data: episode,
    loading,
    error,
  } = useFetch<Episode>(`/episode/${id}`);

  if (loading) return <Loading />;

  if (error || !episode) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="text-ink/70">{error ?? "Episode tidak ditemukan."}</div>
        <BackButton label="Back to Episodes" fallbackTo="/episode" />
      </div>
    );
  }

  // API tidak punya gambar episode, jadi memakai gambar karakter pertama di episode ini
  const cover = getAvatarFromCharacterUrl(episode.characters[0]);

  const details = [
    { label: "Episode", value: episode.episode },
    { label: "Air date", value: episode.air_date },
    { label: "Characters", value: String(episode.characters.length) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="font-title text-4xl font-bold text-ink">
        Episode Detail
      </div>

      <div className="rounded-3xl border border-portal/30 bg-paper p-6 shadow-lg md:p-8">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {cover ? (
            <img
              src={cover}
              alt={episode.name}
              className="w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="aspect-square w-full rounded-2xl bg-portal/20" />
          )}

          <div className="flex flex-col gap-4">
            <div className="font-title text-3xl font-bold text-ink">
              {episode.name}
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
              <BackButton label="Back to Episodes" fallbackTo="/episode" />
            </div>
          </div>
        </div>
      </div>

      <div className="font-title text-2xl font-bold text-ink">
        Characters ({episode.characters.length})
      </div>

      <CharacterList characterUrls={episode.characters} />
    </div>
  );
};

export default EpisodeDetail