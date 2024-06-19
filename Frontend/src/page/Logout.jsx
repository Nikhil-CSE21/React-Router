import { redirect } from "react-router-dom";

export async function action({ request }) {
  //   await fetch("http://127.0.0.1:4000/logout", { method: "POST" });
  localStorage.removeItem("token");
  return redirect("/events");
}
