import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import DataCard from "../../components/DataCard";
import FilterDropdown from "../../components/Dropdown";
import ListPage from "../../components/ListPage";
import StatusBadge from "../../components/StatusBadge";
import useFetch from "../../lib/useFetch";
import { GENDER_OPTIONS, STATUS_OPTIONS } from "../../lib/data";
import type { ApiResponse, Character } from "../../lib/types";

// Mengakses search params dan navigate milik route /characters
const route = getRouteApi("/characters/");

const Characters = () => {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const [keyword, setKeyword] = useState(search.name ?? "");

  const { data, loading, error } = useFetch<ApiResponse<Character>>(
    "/character",
    {
      name: search.name,
      status: search.status,
      gender: search.gender,
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

  const handleStatus = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, status: value || undefined, page: undefined }),
    });
  };

  const handleGender = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, gender: value || undefined, page: undefined }),
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
      title="Characters"
      subtitle="Browse all characters from the show."
      searchValue={keyword}
      onSearchChange={setKeyword}
      onSearchSubmit={handleSearch}
      searchPlaceholder="Search characters..."
      filters={
        <>
          <FilterDropdown
            label="Filter status"
            value={search.status ?? ""}
            options={STATUS_OPTIONS}
            onChange={handleStatus}
          />
          <FilterDropdown
            label="Filter gender"
            value={search.gender ?? ""}
            options={GENDER_OPTIONS}
            onChange={handleGender}
          />
        </>
      }
      count={data?.info.count}
      countLabel="characters"
      loading={loading}
      error={error}
      isEmpty={!data || data.results.length === 0}
      page={search.page ?? 1}
      totalPages={data?.info.pages ?? 1}
      onPageChange={handlePage}
    >
      {data?.results.map((character) => (
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
    </ListPage>
  );
};

export default Characters;