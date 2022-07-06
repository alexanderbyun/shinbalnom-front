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
	axios.put(`${apiUrl}/` + editSneaker.id, editSneaker)
		.then((response) => {
		setSneaker(sneaker.map((sneaker) => {
			return sneaker.id !== response.data.id ? sneaker : response.data
		}))
		})
		console.log(sneaker.brand)
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

	// ------------------------------
	// Toggle fields
	// ------------------------------
	const toggleCreate = () => {
		setShowCreate(!showCreate)
	}
	const toggleUpdate = () => {
		setShowUpdate(!showUpdate)
	}
	// const show = (event, sneaker) => {
	// 	event.preventDefault()
	// 	axios
	// 		.put(
	// 			`${apiUrl}/${sneaker.id}`, {
	// 				brand: sneaker.brand,
	// 				silhouette: sneaker.silhouette,
	// 				nickname: sneaker.nickname,
	// 				colorway: sneaker.colorway,
	// 				styleCode: sneaker.styleCode,
	// 				estimatedRetailValue: sneaker.estimatedRetailValue,
	// 				description: sneaker.description,
	// 				releaseDate: sneaker.releaseDate,
	// 				image: sneaker.image,
	// 				show: !sneaker.show,
	// 			}
	// 		)
	// 		.then(() => {
	// 			axios
	// 				.get(`${apiUrl}`)
	// 				.then((response) => {
	// 					setSneaker(response.data)
	// 				})
	// 		})
	// }
	// ------------------------------
	// Return
	// ------------------------------
	return (
		<>
			<h1>Shinbalnom</h1>
			<h2>Upcoming Releases</h2>

			<div className="header">
				{/* Create component */}
				<button className="btn" onClick={toggleCreate}>New Drop</button>
				{showCreate === true ?
				<Create handleCreate={handleCreate} />
				: null}
				<br/><br/>
			</div>
				
			{sneaker.map((sneaker) => {
			return (
				<>
					<div className="card" key = {sneaker.id}>
						<img src={`${sneaker.image}`} alt="Shinbalnom"/>
						<Read handleRead={handleRead} sneaker={sneaker}/>	
						<button className="btn" onClick={toggleUpdate}>
							Edit
						</button>
						{showUpdate === true ? 
						<Update handleUpdate={handleUpdate} handleDelete={handleDelete} sneaker={sneaker}/>
						: null}
					</div>
				</>
			)
			})}

		</>
	)
}

export default App