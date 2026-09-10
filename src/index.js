import { createRoot } from "react-dom/client";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("arifix-ap-app");
  if (typeof element !== "undefined" && element !== null) {
    const container = document.getElementById("arifix-ap-app");
    const root = createRoot(container);
    root.render(<App />);
  }
});
