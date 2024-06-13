import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    ///stop to realoding page
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Notes added succesfully",'success');
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            minLength={5}
            value={note.title}
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={note.description}
            minLength={5}
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            minLength={5}
            name="tag"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" disabled={note.title.length<5 || note.description.length<5|| note.tag.length<5} className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
