import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import DataCard from "../../components/DataCard";
import FilterDropdown from "../../components/Dropdown";
import ListPage from "../../components/ListPage";
import useFetch from "../../lib/useFetch";
import { LOCATION_TYPE_OPTIONS } from "../../lib/data";
import { getAvatarFromCharacterUrl } from "../../lib/utils";
import type { ApiResponse, Location as LocationData } from "../../lib/types";

// Mengakses search params dan navigate milik route /location
const route = getRouteApi("/location/");

const Location = () => {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const [keyword, setKeyword] = useState(search.name ?? "");

  const { data, loading, error } = useFetch<ApiResponse<LocationData>>(
    "/location",
    {
      name: search.name,
      type: search.type,
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

  const handleType = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, type: value || undefined, page: undefined }),
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
      title="Locations"
      subtitle="Explore all known locations in the multiverse."
      searchValue={keyword}
      onSearchChange={setKeyword}
      onSearchSubmit={handleSearch}
      searchPlaceholder="Search locations..."
      filters={
        <FilterDropdown
          label="Filter type"
          value={search.type ?? ""}
          options={LOCATION_TYPE_OPTIONS}
          onChange={handleType}
        />
      }
      count={data?.info.count}
      countLabel="locations"
      loading={loading}
      error={error}
      isEmpty={!data || data.results.length === 0}
      page={search.page ?? 1}
      totalPages={data?.info.pages ?? 1}
      onPageChange={handlePage}
      gridClassName="grid grid-cols-2 gap-4 md:grid-cols-3"
    >
      {data?.results.map((location) => (
        <DataCard
          key={location.id}
          // API tidak punya gambar lokasi, jadi memakai gambar penghuni pertama (kalau ada)
          image={getAvatarFromCharacterUrl(location.residents[0])}
          title={location.name}
          subtitle={location.type || "Unknown"}
          onView={() =>
            navigate({
              to: "/location/$id",
              params: { id: String(location.id) },
            })
          }
        />
      ))}
    </ListPage>
  );
};

export default Location