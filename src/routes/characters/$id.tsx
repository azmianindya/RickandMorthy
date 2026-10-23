/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import CharactersDetail from "../../features/characters/CharactersDetail";

export const Route = createFileRoute("/characters/$id")({
  component: CharactersDetailPage,
});

function CharactersDetailPage() {
  const { id } = Route.useParams();
  return <CharactersDetail id={id} />;
}