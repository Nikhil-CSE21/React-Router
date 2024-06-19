import { Link, json, defer } from "react-router-dom";
import EventList from "./EventList";

import { useLoaderData } from "react-router-dom";

export default function Event() {
  //const events = useLoaderData();

  // const dummy_events = [
  //   {
  //     id: "e1",
  //     title: "Some Event e1",
  //   },
  //   {
  //     id: "e2",
  //     title: "Some Event e2",
  //   },
  //   {
  //     id: "e3",
  //     title: "Some Event e3",
  //   },
  // ];
  return (
    <>
      <h2>Events Page</h2>
      <EventList />
    </>
  );
}

async function loadEvents() {
  const response = await fetch("http://127.0.0.1:4000/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch Event list" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.events; // Return the parsed data// directly passing response as browser know about it created their own response and retunred it.
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}

// export async function loader() {
//   const response = await fetch("http://127.0.0.1:4000/events");

//   if (!response.ok) {
//     return [{ error: "failed" }];
//     //
//   } else {
//     const resData = await response.json();
//     return resData.events;
//   }
// }

// this code execute in browser. we can not use usestate and other hooks inside loader as this code execute in browser.

// Added new function loader.
// export async function loader() {
//   const response = await fetch("http://127.0.0.1:4000/events");

//   if (!response.ok) {
//return { isError: "true", message: "could not fetch events" };
//throw new Error({ message: "Unable to fetch" }); // router will redirect to nearest errorelement
// throw new Response(JSON.stringify({ message: "Could not fetch" }), {
//   status: 500,
// }); /// Using response as we can pass the status. if use Error that it's not possible

//By using throw for error handling in loaders, you leverage React Router's built-in error
//handling mechanism, which can simplify managing errors across your application. Use return when
//you want to handle data (including error states) directly within your components. This approach
//ensures a clean and maintainable codebase,
//making it easier to understand and manage data flow and error handling.

//     throw json({ message: "Could not fetch Event list" }, { status: 500 });
//   } else {
//     return response; // directly passing response as browser know about it created their own response and retunred it.
//   }
// }
