import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import UserState from "./context/user/UserState";

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
    msg:message,
    type:type

    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <>
      <div>
        <UserState>
        <Navbar showAlert={showAlert}/>
        </UserState>
        <NoteState>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          </Routes>
          <Routes>
            <Route exact path="/about" element={<About />} />
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </NoteState>
        
      </div>
    </>
  );
}

export default App;
