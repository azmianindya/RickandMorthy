import { createFileRoute } from "@tanstack/react-router";
import Location from "../../features/location/Location";
import { asPage, asText } from "../../lib/utils";

export const Route = createFileRoute("/location/")({
  validateSearch: (
    search: Record<string, unknown>
  ): { name?: string; type?: string; page?: number } => ({
    name: asText(search.name),
    type: asText(search.type),
    page: asPage(search.page),
  }),
  component: () => {
    return <Location />;
  },
});