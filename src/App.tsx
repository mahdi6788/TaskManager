import "./App.css";
import { useReducer, useState } from "react";
import AddNewNote from "./components/AddNewNote";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteStatus from "./components/NoteStatus";
import { Note } from "./types/Note";
import { SortByType } from "./types/SortByType";

type Action =
  | { type: "add"; payload: Note }
  | { type: "delete"; payload: number }
  | { type: "complete"; payload: number };

/// notes is an array including objects that has properties of the notes, so Note[]
function noteReducer(notes: Note[], action: Action) {
  switch (action.type) {
    case "add": {
      let newNotes = [...notes, action.payload];
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    }
    case "delete": {
      let newNotes = notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    }
    case "complete": {
      let newNotes = notes.map((note) => {
        return note.id === action.payload
          ? { ...note, completed: !note.completed }
          : note;
      });
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    }
    default:
      throw new Error("Unknown error");
  }
}

function App() {
  const [notes, dispatch] = useReducer(
    noteReducer,
    JSON.parse(localStorage.getItem("notes") ?? "[]") as Note[]
  );

  /* 
  Calls localStorage.getItem only once, so Cleaner and more readable.
  By using the ?? operator, you convert null to a valid fallback value ("[]"), which is always a string.
  This ensures JSON.parse only receives valid input and avoids runtime errors.
  localStorage.getItem returns string | null.
  The ?? (nullish coalescing operator) provides a cleaner way to handle null values:
  If localStorage.getItem("notes") is null, it substitutes "[]".
  as Note[]: Ensures the parsed value matches the expected type.
  */

  const handleAddNotes = (newNote: Note) => {
    dispatch({ type: "add", payload: newNote });
  };
  const handleDelete = (id: number) => {
    dispatch({ type: "delete", payload: id });
  };
  const handleCheckBox = (id: number) => {
    dispatch({ type: "complete", payload: id });
  };
  // sort notes
  const [sortBy, setSortBy] = useState<SortByType>("latest");

  return (
    <div className="component">
      <Header
        notes={notes}
        sortBy={sortBy}
        setSortBy={(value) => setSortBy(value)}
      />
      <div className="note-app">
        <AddNewNote onAddNote={handleAddNotes} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <NotesList
            notes={notes}
            handleDelete={handleDelete}
            handleCheckBox={handleCheckBox}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
