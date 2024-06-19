import { Outlet } from "react-router-dom";
import EventNavigation from "./EventNavigation";

export default function EventRoot() {
  return (
    <>
      <EventNavigation />
      <Outlet />
    </>
  );
}
