import { useEffect } from "react";
import { Form, useFetcher } from "react-router-dom";

export default function NewsLetter() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  // console.log(data);
  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    <>
      <fetcher.Form method="POST" action="/newsletter">
        <input type="email" placeholder="Enter email" name="email"></input>
        <button>Sing up</button>
      </fetcher.Form>
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  if (email) {
    console.log(email);
    return { message: "Signup Successfull" };
  } else {
    return { message: "Email Required" };
  }
}
