import React,{useContext, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import userContext from "../context/user/UserContext";
const Navbar = (props) => {
const context = useContext(userContext);
  const {userData, getUserById,setUserData} = context;

  const navigate = useNavigate();
    const location = useLocation();
     useEffect(() => {
      
      if(localStorage.getItem('token')){
        getUserById();
       
      }
    // eslint-disable-next-line
  }, [location]);

const handleLogout =()=>
{
  localStorage.removeItem('token');
  navigate("/login");

  setUserData({  name: "",
  email: "",
  date: ""});
  props.showAlert("Logout succesfully","success");
}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Notes App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="home"?"active":""}`} aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="about"?"active":""}`} to="/about">About</Link>
          </li>
        </ul>
        <div className="d-flex mx-3" style={{color:'white'}}>
        {userData.name}
        </div>
        
        {
          !localStorage.getItem("token")?
          <form className="d-flex">
          <Link className="btn btn-primary mx-2" to='/login' type="submit">Login</Link>
          <Link className="btn btn-primary mx-2" to='/signup' type="submit">Sign up</Link>
        </form>:<button className="btn btn-primary" onClick={handleLogout}  type="submit">Logout</button>
        }
      </div>
    </div>
  </nav>
  )
}

export default Navbar
