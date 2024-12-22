import { Note } from "../types/Note"
import { SortByType } from "../types/SortByType"

type HeaderPropsType = {
    notes: Note[],
    sortBy: SortByType
    setSortBy: (value: SortByType) => void
}
function Header({notes,sortBy,setSortBy}: HeaderPropsType) {
    // to save values gave from user as an input or option by onChange(event.target.value), we should use control component:
    // const [sortBy, setSortBy] = useState('')
    // But we should use this state at the parent component (App) because Header and NoteList are sibling, and we want to see effect of this component on NoteList component.

    return (
        <div className="note-header">
            <h1>My Tasks({notes.length})</h1>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortByType)}>
                <option value="latest">Sort based on latest task</option>
                <option value="earliest">Sort based on earliest task</option>
                <option value="completed">Sort based on completed task</option>
            </select>        
        </div>
    )
}

export default Header