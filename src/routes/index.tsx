import { createFileRoute } from "@tanstack/react-router";
import Characters from "../features/characters/Characters";
import Episode from "../features/episode/Episode";
import Location from "../features/location/Location";
import HomePage from "../features";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div className="min-h-screen bg-amber-100">
        <HomePage />
        <Characters />
        <Episode />
        <Location />
      </div>
    );
  },
});