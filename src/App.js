import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Fuse from 'fuse.js'
import './style/style.css'
import Create from './components/create.js'
import Read from './components/read.js'
import Update from './components/update.js'

const App = () => {

	const apiUrl = 'https://shinbalnom-backend.herokuapp.com/releases'

	// ------------------------------
	// Hooks
	// ------------------------------
	const [sneaker, setSneaker] = useState([])
	const [showSearch, setShowSearch] = useState(false)
	const [query, setQuery] = useState("")
	const [showCreate, setShowCreate] = useState(false)
	const [showUpdate, setShowUpdate] = useState(false)
	const [showToggle, setShowToggle] = useState("")

	// ------------------------------
	// Effect Hook
	// ------------------------------
	useEffect(() => {
		handleRead()
	}, [])

	// useEffect(() => {
	// 	axios
    //     .get(apiUrl)
    //     .then((response)=>{
    //         console.log(response)
    //     })
	// }, [])

	// ------------------------------
	// Handlers
	// ------------------------------
	const handleRead = () => {
	axios
		.get(apiUrl)
		.then(response => setSneaker(response.data))
		.catch(err =>{
		console.log(err)
		})
	}
	const handleCreate = (addSneaker) => {
	axios
		.post(apiUrl, addSneaker)
		.then((response) => {
		handleRead()
		})
		.catch(err =>{
		console.log(err)
		})
	}
	const handleUpdate = (editSneaker) => {
	axios
		.put(`${apiUrl}/` + editSneaker.id, editSneaker)
		.then((response) => {
			setSneaker(sneaker.map((sneaker) => {
				return sneaker.id !== response.data.id ? sneaker : response.data
			}))
		})
	}
	const handleDelete = (deletedSneaker) => {
	axios.delete(`${apiUrl}/` + deletedSneaker.id)
	.then((response) => {
		setSneaker(
		sneaker.filter(sneakers => sneakers.id !== deletedSneaker.id)
		)
	})
	console.log(sneaker.brand)
	}
	const handleToggle = (sneaker) => {
	showToggle !== `${sneaker.id}`
	? setShowToggle(`${sneaker.id}`)
	: setShowToggle("")
	}
	const searchToggle = () => {
		if (showSearch === false) {
		  setShowSearch(true)
		} else {
		  setShowSearch(false)
		}
	  }

	// ------------------------------
	// Toggle fields
	// ------------------------------
	const toggleCreate = () => {
		setShowCreate(!showCreate)
	}
	const toggleUpdate = () => {
		setShowUpdate(!showUpdate)
	}
	
	// ------------------------------
	// Search components
	// ------------------------------
	const fuse = new Fuse (sneaker, {
		keys: [
		  'brand',
		  'silhouette',
		  'nickname',
		  'colorway',
		  'styleCode',
		  'estimatedRetailPrice'
		]
	  })
	  const results = fuse.search(query)
	  const sneakerResults = query ? results.map(result => result.item) : sneaker
	  function sneakerSearch({ currentTarget = {} }) {
		const { value } = currentTarget;
		setQuery(value);
	  }

	// ------------------------------
	// Return
	// ------------------------------
	return (
		<>
			<div className="header">

				<img width="70%" src="https://pbs.twimg.com/profile_banners/838789468274446337/1508279115/1500x500" alt="Shinbalnom"/>
				<h2>Upcoming Releases</h2>

				{/* Create component */}
				<button className="btn" onClick={toggleCreate}>New Drop</button>
				{showCreate === true ?
				<Create handleCreate={handleCreate} />
				: null}
				<br/><br/>

				{/* Search component */}
				<button className="btn" onClick={()=>setShowSearch(s=>!s)}>Search</button><br/>
				{showSearch ?
				<input type="text" placeholder="Search parts" value={query} onChange={sneakerSearch} />
				: null }

			</div>
				
			{sneakerResults.map((sneaker) => {
			return (
				<>
					<div className="card" key = {sneaker.id}>
						<div className="zoom-container">
						<br/><br/><br/>
							<img src={`${sneaker.image}`} 
							alt="Shinbalnom"/>
						</div>
						<div className="read">
							<Read handleRead={handleRead} sneaker={sneaker}/>
						</div>
						<button className="btn" onClick={toggleUpdate}>
							Edit
						</button>
						<br/><br/><br/>
						{showUpdate === true ? 
						<Update handleRead={handleRead} handleUpdate={handleUpdate} handleDelete={handleDelete} sneaker={sneaker}/>
						: null}
					</div>
				</>
			)
			})}

		</>
	)
}

export default App