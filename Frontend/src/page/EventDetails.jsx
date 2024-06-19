import { Await, defer, redirect, useParams } from "react-router-dom";
import EventItem from "./EventItem";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

import { json } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  // const data = useRouteLoaderData("event-details");

  // const {eventlist, eventdetails} = useRouteLoaderData("event-details");

  // console.log(event);

  return (
    <>
      <EventItem />
      {/* <h1>Event Details {id}</h1> */}
    </>
  );
}

async function loadEventlisting() {
  const response = await fetch("http://127.0.0.1:4000/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch Event list" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.events; // Return the parsed data// directly passing response as browser know about it created their own response and retunred it.
  }
}
async function loadEventdetails(id) {
  // const id = params.id;
  const response = await fetch("http://127.0.0.1:4000/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch Event details" }, { status: 500 });
  } else {
    // return response;
    const data = await response.json();
    return data.event;
  }
}

export async function Get_Event_Details({ params }) {
  return defer({
    eventlist: loadEventlisting(),
    eventdetails: loadEventdetails(params.id),
  });
}

// export async function Get_Event_Details({ request, params }) {
//   const id = params.id;
//   const response = await fetch("http://127.0.0.1:4000/events/" + id);

//   if (!response.ok) {
//     throw json({ message: "Could not fetch Event details" }, { status: 500 });
//   } else {
//     return response;
//   }
// }

function Get_Auth_Token() {
  return localStorage.getItem("token");
}

export async function actions({ request, params }) {
  const token = Get_Auth_Token();
  console.log(token);
  const id = params.id;
  const response = await fetch("http://127.0.0.1:4000/events/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not delete" }, { status: 500 });
  } else {
    return redirect("/events");
  }
}
