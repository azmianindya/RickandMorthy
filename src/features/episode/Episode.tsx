import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import DataCard from "../../components/DataCard";
import FilterDropdown from "../../components/Dropdown";
import ListPage from "../../components/ListPage";
import useFetch from "../../lib/useFetch";
import { SEASON_OPTIONS } from "../../lib/data";
import { getAvatarFromCharacterUrl } from "../../lib/utils";
import type { ApiResponse, Episode as EpisodeData } from "../../lib/types";

// Mengakses search params dan navigate milik route /episode
const route = getRouteApi("/episode/");

const Episode = () => {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const [keyword, setKeyword] = useState(search.name ?? "");

  // Parameter "episode" di API berisi kode season, mis. S01
  const { data, loading, error } = useFetch<ApiResponse<EpisodeData>>(
    "/episode",
    {
      name: search.name,
      episode: search.season,
      page: search.page ?? 1,
    }
  );

  // Mengubah search atau filter selalu mengembalikan ke halaman 1
  const handleSearch = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        name: keyword.trim() || undefined,
        page: undefined,
      }),
    });
  };

  const handleSeason = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, season: value || undefined, page: undefined }),
    });
  };

  const handlePage = (page: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: page > 1 ? page : undefined }),
    });
    window.scrollTo({ top: 0 });
  };

  return (
    <ListPage
      title="Episodes"
      subtitle="Watch every episode and its details."
      searchValue={keyword}
      onSearchChange={setKeyword}
      onSearchSubmit={handleSearch}
      searchPlaceholder="Search episodes..."
      filters={
        <FilterDropdown
          label="Filter season"
          value={search.season ?? ""}
          options={SEASON_OPTIONS}
          onChange={handleSeason}
        />
      }
      count={data?.info.count}
      countLabel="episodes"
      loading={loading}
      error={error}
      isEmpty={!data || data.results.length === 0}
      page={search.page ?? 1}
      totalPages={data?.info.pages ?? 1}
      onPageChange={handlePage}
      gridClassName="flex flex-col gap-4"
    >
      {data?.results.map((episode) => (
        <DataCard
          key={episode.id}
          variant="horizontal"
          image={getAvatarFromCharacterUrl(episode.characters[0])}
          title={`${episode.episode} - ${episode.name}`}
          subtitle={episode.air_date}
          onView={() =>
            navigate({
              to: "/episode/$id",
              params: { id: String(episode.id) },
            })
          }
        />
      ))}
    </ListPage>
  );
};

export default Episode