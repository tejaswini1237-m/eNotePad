import { isEditable } from '@testing-library/user-event/dist/utils'
import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const { note } = props
    const context = useContext(NoteContext)
    const {deleteNote,editNote} = context
    return (
        <div className='col-md-3'>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                    <i class="fa-solid fa-trash-can" onClick={()=>{deleteNote(note._id)}}></i>
                    <i class="fa-solid fa-pen-to-square mx-3"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem