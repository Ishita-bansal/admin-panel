import { ToastContainer } from "react-toastify";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
