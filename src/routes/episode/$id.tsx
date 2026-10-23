import { createFileRoute } from "@tanstack/react-router";
import EpisodeDetail from "../../features/episode/EpisodeDetail";

export const Route = createFileRoute("/episode/$id")({
  component: () => {
    return <EpisodeDetail />;
  },
});