import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js'
import Add from './components/Add';
import Edit from './components/Edit';
import Show from './componenets/show';
import './style/style.css';

const App = () => {

  // ------------------------------
  // Database API URL
  // ------------------------------
  const apiUrl = 'https://shinbalnom-backend.herokuapp.com'

  // ------------------------------
  // Hooks
  // ------------------------------
  const [sneaker, setSneaker] = useState([]);
  const [showSneaker, setShowSneaker] = useState(false);
  const [query, setQuery] = useState('')
  const [showToggle, setShowToggle] = useState("")

  // ------------------------------
  // Handlers
  // ------------------------------
  const handleRead = () => {
    axios
      .get(`${apiUrl}/releases`)
      .then(response => handleRead(response.data))
  }
  const handleCreate = (addSneaker) => {
    axios
      .post(`${apiUrl}/releases`, addPost)
      .then((response) => {
        handleRead()
      })
  }
  const handleUpdate = (editSneaker) => {
    axios.put(`${apiUrl}/releases/` + editSneaker.id, editSneaker)
      .then((response) => {
        setSneaker(sneaker.map((sneaker) => {
          return sneaker.id !== response.data.id ? sneaker : response.data
        }))
      })
  }
  const handleDelete = (deletedSneaker) => {
    axios.delete(`${apiUrl}/releases/` + deletedSneaker.id)
    .then((response) => {
      setSneaker(
        sneaker.filter(sneaker => sneaker.id !== deletedSneaker.id)
      )
    })
  }
  const handleShowToggle = (sneaker) => {
     showToggle != `${sneaker.id}`
     ? setShowToggle(`${sneaker.id}`)
     : setShowToggle("")
  }

  // ------------------------------
  // Search Component
  // ------------------------------
  const fuse = new Fuse (sneaker, {
    keys: [
      'brand',
      'silhouette',
      'colorway',
      'date'
    ]
  })
  const results = fuse.search(query)
  const postResults = query ? results.map(result => result.item) : sneaker
  function postSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  // ------------------------------
  //Effect Hook
  // ------------------------------
  useEffect(() => {
    axios.get(`${apiUrl}/releases`).then((response) => {
      handleRead(response.data)
    })
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
