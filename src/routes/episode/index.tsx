import { createFileRoute } from "@tanstack/react-router";
import Episode from "../../features/episode/Episode";
import { asPage, asText } from "../../lib/utils";

export const Route = createFileRoute("/episode/")({
  validateSearch: (
    search: Record<string, unknown>
  ): { name?: string; season?: string; page?: number } => ({
    name: asText(search.name),
    season: asText(search.season),
    page: asPage(search.page),
  }),
  component: () => {
    return <Episode />;
  },
});