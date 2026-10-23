import { createFileRoute } from "@tanstack/react-router";
import Characters from "../../features/characters/Characters";

export const Route = createFileRoute("/characters/")({
  component: () => {
    return <Characters />
  }
});

