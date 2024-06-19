import {
  Form,
  useNavigate,
  useNavigation,
  useLoaderData,
  useActionData,
} from "react-router-dom";

export default function EveentForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();
  console.log(data, "data  data data");
  const isSubmitted = navigation.state === "submitting";
  console.log(isSubmitted, "isSubmitted isSubmitted");
  function cancelhandles() {
    navigate("..");
  }
  return (
    <>
      <Form method={method}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={event ? event.title : ""}
          />
        </p>
        <p>
          <label htmlFor=""> Date</label>
          <input
            type="text"
            id="date"
            name="date"
            defaultValue={event ? event.date : ""}
          />
        </p>
        <p>
          <label htmlFor="">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={event ? event.image : ""}
          />
        </p>
        <p>
          <label htmlFor="">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={event ? event.description : ""}
          />
        </p>
        <div>
          <button type="button" onClick={cancelhandles}>
            Cancel
          </button>
          <button disabled={isSubmitted}>
            {isSubmitted ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}
