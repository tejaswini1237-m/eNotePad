import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import Notes from './Notes';

function Home() {
    const context = useContext(NoteContext);
    return (
        <div className='container my-3'>
             <Notes /> 
        </div>
    )
}

export default Home