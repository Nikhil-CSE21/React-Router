import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorPageContent from "./ErrorPageContent";

export default function ErrorPage() {
  const error = useRouteError();
  //   console.log(JSON.stringify(error, null, 2), "error error");
  console.log(error, "error error");
  let title;
  let message = "something went wrong";

  //   if (isRouteErrorResponse(error)) {
  //     return <h1>we are getting error </h1>;
  //   }

  //   throw error;

  if (error) {
    if (error.status === 500) {
      // message = JSON.parse(error.data).message;
      message = error.data.message;
    }

    if (error.status === 404) {
      console.log(error.status);
      title: "Not found";
      message = "Error Occured";
    }
  }

  return (
    <>
      <ErrorPageContent>{message}</ErrorPageContent>;
    </>
  );
}
