import { json, redirect } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function AuthenticationPage() {
  return (
    <>
      <AuthForm />
    </>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;

  console.log(request.url);
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported request" }, { status: 422 });
  }

  const data = await request.formData();
  const authdata = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://127.0.0.1:4000/` + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authdata),
  });

  if (response.status == 422 || response.status == 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticates user" }, { status: 500 });
  }

  const resData = await response.json();

  const token = resData.token;
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("tokenExpiry", expiration.toISOString());

  return redirect("/");
}
