import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
  const host = "http://localhost:5000";
const initialUser= {
  name: "",
  email: "",
  date: "",
};
  const [userData, setUserData] = useState(initialUser);

  const getUserById = async () => {
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUserData(json);
  };
  return (
    <UserContext.Provider value={{ getUserById, userData,setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
