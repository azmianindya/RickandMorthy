import { createFileRoute } from "@tanstack/react-router";
import Episode from "../../features/episode/Episode";

export const Route = createFileRoute("/episode/")({
  component: () => {
    return <Episode />
  }
});

