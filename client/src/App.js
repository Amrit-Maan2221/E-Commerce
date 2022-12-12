import {RouterProvider} from "react-router-dom";
import Routes from "./routes/Routes";
import "./App.css"



function App() {
  return (
    <>
        <RouterProvider router={Routes} />
    </>
  );
}

export default App;
