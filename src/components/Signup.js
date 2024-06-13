import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name:"",
    cpassword:""
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name:credentials.name
      }),
    });
    const json = await response.json();
    console.log("response login" + json.error);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert( "Signup successfully","success");
      navigate('/');
      setCredentials({email:"",password:"",name:"",cpassword:""});
    
    } else {
      props.showAlert( json.error,"danger");
    }
   
  };

  return (
    <div className="container" style={{marginTop:"30px"}}>
      <h2>Signup to Notebook app</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="name"
          onChange={onChange}
          id="name"
          value={credentials.name}
          name="name"
          className="form-control"
        />
      </div>
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
          // minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          onChange={onChange}
          id="cpassword"
          value={credentials.cpassword}
          name="cpassword"
          className="form-control"
          // minLength={5}
          required
        />
      </div>
      <button type="submit" disabled={credentials.email.length===0||credentials.password.length===0 || credentials.name.length===0 || credentials.cpassword.length===0} className="btn btn-primary">
        Signup
      </button>
    </form>
    {/* {success && <Navigate to="/home"  />} */}
  </div>
  )
}

export default Signup
