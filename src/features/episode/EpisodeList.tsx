import { useNavigate } from "@tanstack/react-router";
import { Tv } from "lucide-react";
import InfoCard from "../../components/InfoCard";
import Loading from "../../components/Loading";
import useFetch from "../../lib/useFetch";
import { getIdFromUrl } from "../../lib/utils";
import type { Episode } from "../../lib/types";

type EpisodeListProps = {
  episodeUrls: string[];
};

const EpisodeList = ({ episodeUrls }: EpisodeListProps) => {
  const navigate = useNavigate();

  // Semua id episode digabung jadi satu request: /episode/1,2,3
  const ids = episodeUrls.map(getIdFromUrl).join(",");

  // API mengembalikan array kalau id lebih dari satu, dan objek kalau hanya satu
  const { data, loading, error } = useFetch<Episode | Episode[]>(
    `/episode/${ids}`
  );

  if (loading) return <Loading />;

  if (error || !data) {
    return (
      <div className="py-6 text-center text-red-500">
        Gagal memuat episode.
      </div>
    );
  }

  const episodes = Array.isArray(data) ? data : [data];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <InfoCard
          key={episode.id}
          label={episode.episode}
          title={episode.name}
          meta={`Air Date: ${episode.air_date}`}
          icon={<Tv size={24} />}
          onClick={() =>
            navigate({
              to: "/episode/$id",
              params: { id: String(episode.id) },
            })
          }
        />
      ))}
    </div>
  );
};

export default EpisodeList