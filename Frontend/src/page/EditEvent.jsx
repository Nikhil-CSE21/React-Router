import { useRouteLoaderData } from "react-router-dom";
import EveentForm from "./EventForm";

export default function EditEvent({ method, event }) {
  const data = useRouteLoaderData("event-details");
  return (
    <>
      <EveentForm event={data.event} method="PATCH" />
    </>
  );
}
