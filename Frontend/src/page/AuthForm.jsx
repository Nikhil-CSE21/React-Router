import { Form, Link, useSearchParams } from "react-router-dom";

export default function AuthForm() {
  const [searchParmas] = useSearchParams();
  let isLogin = searchParmas.get("mode") === "login";
  return (
    <>
      <div>
        <h2> {isLogin ? "Login" : "Create a account"} </h2>
        <Form method="POST">
          <label htmlFor="">Email</label>
          <br />
          <input type="email" name="email" />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" />
          <br />
          <br />
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create a account" : "Login"}
          </Link>

          <br />
          <button type="Submit">Save </button>
          <br />
        </Form>
      </div>
    </>
  );
}
