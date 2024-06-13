import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { note,updateNotes ,showAlert} = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-sharp fa-solid fa-trash mx-2"
              onClick={(e) => {
                e.preventDefault();
                deleteNote(note._id);
                showAlert("Notes deleted succuesfully",'danger');
              }}
            />
            <i className="fa-solid fa-pen-to-square mx-2" onClick={(e)=>{updateNotes(note);
            
            }} ></i>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
