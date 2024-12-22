import { Note } from "../types/Note";
import { SortByType } from "../types/SortByType";
import { IoIosCloseCircleOutline } from "react-icons/io";

type NotesListProps = {
  notes: Note[];
  handleDelete: (id: number) => void;
  handleCheckBox: (id: number) => void;
  sortBy: SortByType;
};

function NotesList({
  notes,
  handleDelete,
  handleCheckBox,
  sortBy,
}: NotesListProps) {
  // use sortedNotes as a coopy of notes to prevent from changing the state of notes.
  //  also we use [...notes] as a clone of notes to prevent from mutating the notes.
  let sortedNotes = notes;
  if (sortBy === "earliest") {
    sortedNotes = [...notes].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    // a-b > 0 (a > b) ? 1 (replace with each other) : -1 (don't do anything)
  }

  if (sortBy === "latest") {
    sortedNotes = [...notes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    // b-a > 0 (b > a) ? 1 : -1
  }

  if (sortBy === "completed") {
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  }

  return (
    <div>
      {/* use sortedNotes instead of notes */}
      {sortedNotes.map((note) => (
        <NoteItem
          note={note}
          key={note.id}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
        />
      ))}
    </div>
  );
}

export default NotesList;

type NoteItemProps = {
  note: Note;
} & Pick<NotesListProps, "handleDelete" | "handleCheckBox">;

type Option = {
  year: "numeric";
  month: "long";
  day: "numeric";
};

function NoteItem({ note, handleDelete, handleCheckBox }: NoteItemProps) {
  // format to display date
  const option: Option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={`note-item ${note.completed && "completed"}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => handleDelete(note.id)}>
            <IoIosCloseCircleOutline size={25} />
          </button>
          <input onChange={() => handleCheckBox(note.id)} type="checkbox" />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", option)}
      </div>
    </div>
  );
}
