import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import './CSS/Admin.css'
import './CSS/AdminLogin.css'
import './CSS/AdminNavBar.css'
import './CSS/Font.css'
import Cookies from "js-cookie";
import NavBar from "./Component/NavBar.jsx";
import RouteComponent from "./Component/RouteComponent.jsx";
import {useLocation, matchPath, useNavigate} from "react-router";
import {use, useEffect, useState} from "react";
function App() {
  const navigate = useNavigate();
  const [user,setUser] = useState({
        islog:false,
        email:"default",
        role:"",
        token:""
      }
  );
  const getAccountInfo=async ()=>{
    const token=sessionStorage.getItem('account')
    if(token!==null) {
      const response = await fetch('http://localhost:8080/users/myinfo', {
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + token},
        method: "GET",
        credentials: 'include',
      });
      const content = await response.json();
      if (!response.ok) {
        setUser({
          islog:false,
          email:"",
          role:"",
          token:""
        });
      } else {
        setUser({...content.result,islog: true,token: token})
      }
    }else
      setUser({
        islog:false,
        email:"",
        role:""
      });
  }
  useEffect(()=>{
    getAccountInfo();
  },[])
  useEffect(()=>{
    if(!user.islog && user.email===""){
      navigate('/login');
    }
  },[user])
  const logout = async () => {
    const response = await fetch('http://localhost:5125/api/Auth/logout', {
      headers: {'Content-Type': 'application/json'},
      method: "POST",
      credentials: 'include',
    });
    if(response.ok){
      sessionStorage.removeItem('account')
      getAccountInfo()
    }
  }
  return (
    <>
      <RouteComponent logOut={logout} getInfo={getAccountInfo} user={user}></RouteComponent>
    </>
  )
}

export default App
