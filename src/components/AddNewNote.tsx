import { useState } from "react";
import { Note } from "../types/Note";


function AddNewNote({onAddNote}: {onAddNote: (newNote: Note) => void}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // using onSubmit in form is better than onClick in button, because we can use enter button to submit the form after filling that.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // to prevent from refreshing the page
    event.preventDefault();
    // 
    if (!title || !description) return null
    // to store note in an object and for future usage
    const newNote: Note = {
      title,
      description,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    // to make the input empty and ready for another note
    setTitle("");
    setDescription("");
    onAddNote(newNote)

  };

  //   next step: updating the existing notes

  return (
    <div className="add-new-note">
      <h2>Add New Task</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-field"
          placeholder="Task Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          className="text-field"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn--primary">
          Add New Task
        </button>
      </form>
    </div>
  );
}

export default AddNewNote;
