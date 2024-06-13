// import React, { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  
  // const s1 = {
  //     "name":"this is gopi",
  //     "age":76
  // };

  // const [state,setState]=useState(s1);

  // const update = ()=>{
  //     setTimeout(() => {

  //         setState({
  //             "name":"gittt",
  //             "age":25
  //         })
  //     }, 1000);
  // }

  ///get all note
  const getNotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
      });
       const json =await response.json();
       
       setNotes(json);

  }

  const addNote = async(title, description, tag) => {
const response =await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
        body: JSON.stringify({title,description,tag}), 
      });

      const note =await response.json(); 
      //  getNotes();
    // const note = {
    //   _id: "65a0e01fed45ef91f30c87c58",
    //   user: "65a0c3eaa76503f52ef51ebd",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-01-12T06:45:50.441Z",
    //   __v: 0,
    // };
    setNotes(notes.concat(note));
  };

  //delete note
  const   deleteNote =async (id) => {
     await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };
  ///edit a note
  const editNote = async(id, title, description, tag) => {
await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
        body: JSON.stringify({title,description,tag}), 
      });
    //    const json = response.json();

    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNote);
  };
  return (
    //<NoteContext.Provider value ={{state:state,update:update}}>
    <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
