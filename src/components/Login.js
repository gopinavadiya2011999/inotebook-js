import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      
      navigate('/');
      props.showAlert( "Login successfully","success");
      setCredentials({email:"",password:""});
    
    } else {
      props.showAlert( json.error,"danger");
    }
    console.log("response login" + json.authtoken);
  };

  return (
    <div className="container" style={{marginTop:"30px"}}>
      <h2>Login to Notebook app</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={onChange}
            id="email"
            value={credentials.email}
            name="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            id="password"
            value={credentials.password}
            name="password"
            className="form-control"
          />
        </div>

        <button type="submit"  disabled={credentials.email.length===0||credentials.password.length===0} className="btn btn-primary">
          Login
        </button>
      </form>
      {/* {success && <Navigate to="/home"  />} */}
    </div>
  );
};

export default Login;
