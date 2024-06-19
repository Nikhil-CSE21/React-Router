import { NavLink, Form } from "react-router-dom";
import classes from "./Mainnavigation.module.css";
import NewsLetter from "./NewsLetterPage";
import { useRouteLoaderData } from "react-router-dom";

export default function Mainnavigation() {
  let token = useRouteLoaderData("root");
  console.log("Mainavigation");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              NewsLetter
            </NavLink>
          </li>

          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Auth
              </NavLink>
            </li>
          )}

          {token && (
            <li>
              <Form method="POST" action="/logout">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <br />
      <br />

      <NewsLetter />
    </header>
  );
}
