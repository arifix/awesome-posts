import App from "./components/App";

document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("tss-app");
  if (typeof element !== "undefined" && element !== null) {
    ReactDOM.render(<App />, document.getElementById("tss-app"));
  }
});
