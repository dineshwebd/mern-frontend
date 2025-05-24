import React, { useEffect, useState } from 'react'
import Navbar from '../assets/components/Navbar'
import NoteModel from '../assets/components/NoteModel'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Card from '../assets/components/Card';

const Home = () => {
  const [modelOpen, setModelOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNOte] = useState(null)
  const [filterNotes, setFilterNotes] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {

    fetchNotes()
  }, [])


  useEffect(()=>{
    setFilterNotes(
      notes.filter((note)=>
       note.title.toLowerCase().includes(query.toLowerCase()) ||
       note.description.toLowerCase().includes(query.toLowerCase())
    )
    );

  },[query,notes])

 


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("https://mern-stack-oaf0.onrender.com/api/note",{
        headers: {
          confirmation: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setNotes(data.notes)
    } catch (error) {
      console.log(error);

    }
  }


  const closeModel = () => {
    setModelOpen(false)
  }

  const onEdit = (note) => {
    setCurrentNOte(note)
    setModelOpen(true)
  };
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `https://mern-stack-oaf0.onrender.com/api/note/${id}`,
        { title, description }, {
        headers: {
          confirmation: `Bearer ${localStorage.getItem("token")}`
        }
      }
      );
      if (response.data.success) {
        fetchNotes()
        navigate('/')
        closeModel()
      }
    } catch (error) {

    }
  };
  const navigate = useNavigate()
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "https://mern-stack-oaf0.onrender.com/api/note/add",
        { title, description }, {
        headers: {
          confirmation: `Bearer ${localStorage.getItem("token")}`

        }
      }

      );
      if (response.data.success) {
        fetchNotes()
        closeModel()
      }
    } catch (error) {
      console.log("add note error");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `https://mern-stack-oaf0.onrender.com/api/note/${id}`,
        {
          headers: {
            confirmation: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response.data.success) {
        fetchNotes()
        alert("You wanna delete this Note")
      }
    } catch (error) {
      console.log("Delete Note error", error);


    }

  };

  return (


    <div className="bg-gray-300 min-h-screen">
      <Navbar setQuery={setQuery}/>
      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-25">
         { filterNotes.length > 0 ?filterNotes.map((note)=>(
          <Card
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )) : <p className='text-bold  text-2xl'>No Notes</p>}
      </div>

      <button onClick={() => setModelOpen(true)}
        className='fixed right-4 bottom-6 bg-teal-500 text-white font-bold text-2xl w-10 text-center h-10 rounded-full cursor-pointer'>
        +
      </button>
      {modelOpen && <NoteModel
        closeModel={closeModel}
        addNote={addNote}
        currentNote={currentNote}
        editNote={editNote}
      />}

    </div>



  )
}

export default Home