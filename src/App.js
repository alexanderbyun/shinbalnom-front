import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Fuse from 'fuse.js'
import './style/style.css'
import Create from './components/create.js'

const App = () => {
  
  const apiUrl = 'https://shinbalnom-backend.herokuapp.com/releases'

  // ------------------------------
  // Hooks
  // ------------------------------
  const [sneaker, setSneaker] = useState([])
  const [showSneaker, setShowSneaker] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const [showToggle, setShowToggle] = useState("")
  
  // ------------------------------
  // Effect Hook
  // ------------------------------
  useEffect(() => {
    axios.get(`${apiUrl}/releases`).then((response) => {
      handleRead(response.data)
    })
  }, [])

  // ------------------------------
  // Handlers
  // ------------------------------
  const handleRead = () => {
    axios
      .get(`${apiUrl}/releases`)
      .then(response => setSneaker)
  }
  const handleCreate = (addSneaker) => {
    axios
      .sneaker(`${apiUrl}/releases`, addSneaker)
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
        sneaker.filter(sneakers => sneakers.id !== deletedSneaker.id)
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
      'nickname',
      'styleCode',
      'estimatedRetailPrice',
      'date',
    ]
  })
  const results = fuse.search(query)
  const postResults = query ? results.map(result => result.item) : sneaker
  function postSearch({currentTarget = {}}) {
    const {value} = currentTarget
    setQuery(value)
  }

  // ------------------------------
  // Return
  // ------------------------------
  return (
    <>
     <h1>Hello World!</h1>
     <h2>Goodbye</h2>
    </>
  )
}

export default App