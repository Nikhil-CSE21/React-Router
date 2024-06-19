import { redirect } from "react-router-dom";

export function getTokenDuration() {
  let StoredExpirationDate = localStorage.getItem("tokenExpiry");
  const expirationDate = new Date(StoredExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function tokenLoader() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  console.log(tokenDuration);
  if (tokenDuration < 0) {
    return "Expired";
  }

  return token;
}

export function checkLoader() {
  let token = localStorage.getItem("token");
  if (!token) {
    return redirect("/auth");
  }

  return undefined;
}
