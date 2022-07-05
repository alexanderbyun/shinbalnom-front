import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Fuse from 'fuse.js'
import './style/style.css'
import Create from './components/create.js'
import Read from './components/read.js'
import Update from './components/update.js'

const App = () => {
  
  const apiUrl = 'https://shinbalnom-backend.herokuapp.com'

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
    handleRead()
  }, [])

  // ------------------------------
  // Handlers
  // ------------------------------
  const handleRead = () => {
    axios
      .get(`${apiUrl}/releases`)
      .then(response => setSneaker)
      .catch(err =>{
        console.log(err)
      })
      console.log(sneaker.brand)
  }
  const handleCreate = (addSneaker) => {
    axios
      .post(`${apiUrl}/releases`, addSneaker)
      .then((response) => {
        handleRead()
      })
      .catch(err =>{
        console.log(err)
      })
      console.log(sneaker.brand)
  }
  const handleUpdate = (editSneaker) => {
    axios.put(`${apiUrl}/releases/` + editSneaker.id, editSneaker)
      .then((response) => {
        setSneaker(sneaker.map((sneaker) => {
          return sneaker.id !== response.data.id ? sneaker : response.data
        }))
      })
      console.log(sneaker.brand)
  }
  const handleDelete = (deletedSneaker) => {
    axios.delete(`${apiUrl}/releases/` + deletedSneaker.id)
    .then((response) => {
      setSneaker(
        sneaker.filter(sneakers => sneakers.id !== deletedSneaker.id)
      )
    })
    console.log(sneaker.brand)
  }
  const handleShowToggle = (sneaker) => {
    showToggle !== `${sneaker.id}`
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
  const sneakerResults = query ? results.map(result => result.item) : sneaker
  function sneakerSearch({currentTarget = {}}) {
    const {value} = currentTarget
    setQuery(value)
  }

  // ------------------------------
  // Toggle fields
  // ------------------------------
  const toggleCreate = () => {
		setShowSneaker(!showSneaker)
	}

  // ------------------------------
  // Return
  // ------------------------------
  return (
    <>

     <div className="header">

        <h1>Shinbalnom</h1>
        <h2>Upcoming Releases</h2>

        {/* Create component */}
        <button className="btn" onClick={toggleCreate}>New Drop</button>
        {showSneaker === true ?
        <Create handleCreate={handleCreate} />
        : null}
        <br/><br/>

        {/* Search component */}
        <button className="btn" onClick={()=>setShowSearch(s=>!s)}>Search Sneakers</button><br/>
        {showSearch ?
        <input type="text" placeholder="Search" value={query} onChange={sneakerSearch} />
        : null }
        <br/>

    </div>

    <div>
      
      <img src={`${sneaker.image}`} alt="Shinbalnom" />
      <Read sneaker={sneaker} />
      <Update handleUpdate={handleUpdate} handleDelete={handleDelete} sneaker={sneaker} handleRead={handleRead}/>

      {/* {sneakerResults.map((sneaker) => {
        return(
          showToggle !== `${sneaker.id}`
          ?
          <div className="card" key={sneaker.id} onClick={() => {handleShowToggle(sneaker)}}>
            <div className="zoom-container">
              <img src={`${sneaker.image}`} alt="Shinbalnom" />
            </div>
            <h2>{sneaker.name}</h2>
          </div>
          :
          <div className="show" key={sneaker.id}>
            <div onClick={() => {handleShowToggle(sneaker)}}>
              <Read sneaker={sneaker} />
            </div>
            <Update handleUpdate={handleUpdate} handleDelete={handleDelete} sneaker={sneaker} handleRead={handleRead}/>
          </div>
        )
        })} */}

    </div>

    </>
  )
}

export default App