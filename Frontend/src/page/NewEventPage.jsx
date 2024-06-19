import EveentForm from "./EventForm";
import { json, redirect } from "react-router-dom";

export default function AddEvent() {
  return (
    <>
      <EveentForm method="POST" />
    </>
  );
}

function Get_Auth_Token() {
  return localStorage.getItem("token");
}

export async function actions({ request, params }) {
  const data = await request.formData();
  const requestType = request.method;
  const token = Get_Auth_Token();
  const eventData = {
    title: data.get("title"),
    description: data.get("description"),
    date: data.get("date"),
    image: data.get("image"),
  };

  let url = "http://127.0.0.1:4000/events/";

  if (requestType == "PATCH") {
    url = "http://127.0.0.1:4000/events/" + params.id;
  }
  try {
    const response = await fetch(url, {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(eventData),
    });
    if (response.status == 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not fetch" }, { status: 500 });
    }
  } catch (error) {
    throw json({ message: "Internet Connection failed" }, { status: 500 });
  }

  return redirect("/events");
}
