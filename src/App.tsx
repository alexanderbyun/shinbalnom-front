import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js'
import add from './components/add';
import edit from './components/edit';
import show from './componenets/show';
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
  
  // ------------------------------
  // Handlers
  // ------------------------------
  const handleRead = () => {
    axios
      .get(`${apiUrl}/releases`)
      .then(response => handleRead(response.data),
      (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }
  const handleCreate = (addSneaker) => {
    axios
      .post(`${apiUrl}/releases`, addPost)
      .then((response) => {
        handleRead()
      })
  }
  const handleUpdate = (editSneaker) => {
    axios.put(`${apiUrl}/releases` + editSneaker.id, editSneaker)
      .then((response) => {
        setSneaker(sneaker.map((sneaker) => {
          return sneaker.id !== response.data.id ? sneaker : response.data
        }))
      })
  }
  // ------------------------------
  //Effect Hook
  // ------------------------------
  useEffect(() => {
    axios.get(`${apiUrl}/releases`).then((response) => {
      getSneaker(response.data)
    })
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
