import { Outlet, useNavigation } from "react-router-dom";
import Mainnavigation from "./Mainnavigation.jsx";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigation();
  // console.log(navigate.state);
  console.log("Root render");
  return (
    <>
      <Mainnavigation />
      {/* {navigate.state === "loading" && <p>Loading ..... </p>} */}
      <Outlet />
    </>
  );
}
