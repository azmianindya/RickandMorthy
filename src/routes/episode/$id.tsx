/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import EpisodeDetail from "../../features/episode/EpisodeDetail";

export const Route = createFileRoute("/episode/$id")({
  component: EpisodeDetailPage,
});

function EpisodeDetailPage() {
  const { id } = Route.useParams();
  return <EpisodeDetail id={id} />;
}