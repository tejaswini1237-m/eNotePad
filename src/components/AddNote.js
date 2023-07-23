import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
function AddNote() {
    const context = useContext(NoteContext)
    const{addNote}=context
    const [post, setpost] = useState({
        title:"",
        description:""
    });
    const handleClick = (event)=>{
       event.preventDefault();
       addNote(post.title,post.description)
    } 
    const handleChange = (event)=>{
         const {name,value}=event.target
         setpost({...post,[name]:value})
    }
    return (
        <div>
            <h1>Add Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">TITLE</label>
                    <input type="text" onChange={handleChange} className="form-control"  name="title" id="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">DESCRIPTION</label>
                    <input type="text" onChange={handleChange} className="form-control" name="description" id="description" />
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>

        </div>
    )
}

export default AddNote