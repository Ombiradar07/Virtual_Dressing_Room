import { useContext } from "react";
import myContext from "../context/myContext";

export default function Footer() {
  const context = useContext(myContext);
  const { toggleMode, mode } = context;

  return (
    <footer
      className="text-gray-600 body-font bg-gray-300 "
      style={{
        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
        <div className="container px-5 py-3 mx-auto flex justify-center items-center">
          <p
            className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4 text-center"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            © 2024 All Rights Reserved
          </p>
        </div>
    </footer>
  );
}
