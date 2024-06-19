import {
  useLoaderData,
  useSubmit,
  useRouteLoaderData,
  Await,
} from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { Suspense } from "react";

export default function EventItem({ event }) {
  let token = useRouteLoaderData("root");
  const submit = useSubmit();

  const { eventlist, eventdetails } = useRouteLoaderData("event-details");

  console.log(eventlist, "eventlist eventlist");
  console.log(eventdetails, "eventdetails eventdetails");

  function StartDefaultHandles() {
    const proceed = window.confirm("Are you sure");
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  // console.log(event);
  return (
    <>
      <Suspense fallback={<p>Loading Details</p>}>
        <Await resolve={eventdetails}>
          {(loadeventdetails) => {
            return (
              loadeventdetails && (
                <article>
                  <h1>{loadeventdetails.title}</h1>
                  <time>{loadeventdetails.date}</time>
                  <p> {loadeventdetails.description}</p>
                  {token && (
                    <menu>
                      <Link to={`edit`}>Edit </Link>
                      <button onClick={StartDefaultHandles}>Delete</button>
                    </menu>
                  )}
                </article>
              )
            );
          }}
        </Await>
      </Suspense>
      <h1> Event Listing </h1>
      <Suspense fallback={<p>Loading Listing</p>}>
        <Await resolve={eventlist}>
          {(loadeventlist) => {
            return (
              loadeventlist &&
              loadeventlist.map((loadeventlist) => (
                <li key={loadeventlist.id}>{loadeventlist.title}</li>
              ))
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
