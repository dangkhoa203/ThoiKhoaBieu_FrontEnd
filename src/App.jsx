import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import './CSS/Admin.css'
import './CSS/AdminLogin.css'
import NavBar from "./Component/NavBar.jsx";
import RouteComponent from "./Component/RouteComponent.jsx";
import { useLocation, matchPath } from "react-router";
function App() {
  const { pathname } = useLocation();
  const isAdminPath = matchPath("/admin/*", pathname);

  return (
    <>
      {isAdminPath ? "":
          <NavBar></NavBar>
      }

      <RouteComponent></RouteComponent>
    </>
  )
}

export default App
