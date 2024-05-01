import { ToastContainer } from "react-toastify";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./components";
import { useSelector } from "react-redux";
import {Loaderreducer} from "./redux/reducer/loaderreducer";
function App() {
  // const isLoading = useSelector(state=>state?.Loaderreducer?.isLoader)
  //  console.log('------------------->',isLoading)

return (
    <div>
      <Router />
      {/* {isLoading && <Loader />} */}
      <ToastContainer />
    </div>
  );
}

export default App;
