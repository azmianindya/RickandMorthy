import { createFileRoute } from "@tanstack/react-router";
import CharactersDetail from "../../features/characters/CharactersDetail";

export const Route = createFileRoute("/characters/$id")({
  component: () => {
    return <CharactersDetail />;
  },
});