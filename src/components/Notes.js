import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

function Notes(props) {
    const context = useContext(NoteContext)
    const { notes,fetchallNotes  } = context
    useEffect(() => {
      fetchallNotes()
    }, [])
    
    return (
        <div>
            <AddNote />
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes