import { createFileRoute } from "@tanstack/react-router";
import Location from "../../features/location/Location";

export const Route = createFileRoute("/location/")({
  component: () => {
    return <Location />
  }
});

