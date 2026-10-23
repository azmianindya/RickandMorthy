import { createFileRoute } from "@tanstack/react-router";
import Characters from "../../features/characters/Characters";
import { asPage, asText } from "../../lib/utils";

export const Route = createFileRoute("/characters/")({
  validateSearch: (
    search: Record<string, unknown>
  ): { name?: string; status?: string; gender?: string; page?: number } => ({
    name: asText(search.name),
    status: asText(search.status),
    gender: asText(search.gender),
    page: asPage(search.page),
  }),
  component: () => {
    return <Characters />;
  },
});