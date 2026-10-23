/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import LocationDetail from "../../features/location/LocationDetail";

export const Route = createFileRoute("/location/$id")({
  component: LocationDetailPage,
});

function LocationDetailPage() {
  const { id } = Route.useParams();
  return <LocationDetail id={id} />;
}