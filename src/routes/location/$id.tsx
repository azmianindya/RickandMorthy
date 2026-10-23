import { createFileRoute } from "@tanstack/react-router";
import LocationDetail from "../../features/location/LocationDetail";

export const Route = createFileRoute("/location/$id")({
  component: () => {
    return <LocationDetail />;
  },
});