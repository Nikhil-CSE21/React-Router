import { Suspense } from "react";
import { Await, Link } from "react-router-dom";

import { useLoaderData } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function EventList() {
  // directly using loader  return value  in element or componets of element but nit allowed in parent element
  const { events } = useLoaderData();

  // console.log(events, " events events events events");

  // Check if events is defined and not an error
  // if (!events || events.isError) {
  //   return <p>{events.message}</p>;
  // }

  //console.log(events, "events events");

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Await errorElement={<ErrorPage />} resolve={events}>
        {(loadedEvents) => {
          if (!loadedEvents || loadedEvents.isError) {
            return <p>{loadedEvents.message}</p>;
          }
          return (
            <ul>
              {loadedEvents.map((event) => (
                <li key={event.id}>
                  <Link to={`${event.id}`}>{event.title}</Link>
                  <img src={`${event.image}`} alt={event.title} />
                  <p>{event.date}</p>
                </li>
              ))}
            </ul>
          );
        }}
      </Await>
    </Suspense>
  );
}
