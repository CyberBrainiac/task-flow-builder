import { Outlet } from "react-router-dom";
import Header from "./ui/Header";

const App = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default App;
