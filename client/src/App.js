import {RouterProvider} from "react-router-dom";
import Routes from "./routes/Routes";
import "./App.scss"



function App() {
  return (
    <>
        <RouterProvider router={Routes} />
    </>
  );
}

export default App;
