import { NavLink } from "react-router-dom";
import classes from "./Mainnavigation.module.css";
export default function EventNavigation() {
  return (
    <>
      <h1> Event Navigation</h1>;
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
