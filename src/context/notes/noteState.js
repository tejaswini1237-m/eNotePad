import NoteContext from "./noteContext"
import React, { useState } from "react"
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []


    const [notes, setnotes] = useState(notesInitial)

    //etchallNotes
    const fetchallNotes = async () => {
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNGI3YmY4M2UyYjRjOWZiYzZhYTNmIn0sImlhdCI6MTY1NjAxMDc4MH0.y9L2e8dUCHasRwJsywgSk1CgorQEkCneyuloHpXAMN8'
            },
        });
        const json = await response.json();
        console.log(json)
        setnotes(json)
    }

    //addNote
    const addNote = async (title, description) => {
        const response = await fetch(`${host}/api/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNGI3YmY4M2UyYjRjOWZiYzZhYTNmIn0sImlhdCI6MTY1NjAxMDc4MH0.y9L2e8dUCHasRwJsywgSk1CgorQEkCneyuloHpXAMN8'
            },
            body: JSON.stringify({title,description})
        });
        const note = {
            "_id": "62b53fb6bfb6452780c35bbb",
            "user": "62b4b7bf83e2b4c9fbc6aa3f",
            "title": title,
            "description": description,
            "__v": 0
        }
        setnotes(notes.concat(note))
    }

    //deleteNote
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNGI3YmY4M2UyYjRjOWZiYzZhYTNmIn0sImlhdCI6MTY1NjAxMDc4MH0.y9L2e8dUCHasRwJsywgSk1CgorQEkCneyuloHpXAMN8'
            },
            body: JSON.stringify()
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote,fetchallNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;