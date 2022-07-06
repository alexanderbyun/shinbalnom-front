import React, {useState, useEffect} from 'react'
import '../style/style.css'

const Update = (props) => {

	// ------------------------------
	// Hooks
	// ------------------------------
    const [sneaker, setSneaker] = useState({...props.sneaker})

	// ------------------------------
	// Handlers
	// ------------------------------
    const handleChange = (event) => {
        setSneaker({...sneaker, [event.target.name]: event.target.value})
      }
      const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(sneaker)
        window.location.reload(false)
      }
      const handleDeleteSubmit = (event) => {
        event.preventDefault()
        props.handleDelete(sneaker)
      }

	// ------------------------------
	// Return
	// ------------------------------      
    return (
        <>
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='releaseDate'> Release Date: </label>
                    <input type="date" name="releaseDate" value={sneaker.releaseDate} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='brand'>Brand: </label>
                    <input type="text" name="brand" value={sneaker.brand} onChange={handleChange} />
                <br/><br/>
                
                <label htmlFor='silhouette' >Silhouette: </label>
                    <input type="text" name="silhouette" value={sneaker.silhouette} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='nickname' >Nickname: </label>
                    <input type="text" name="nickname" value={sneaker.nickname} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='colorway' >Colorway: </label>
                    <input type="text" name="colorway" value={sneaker.colorway} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='styleCode' >Style Code: </label>
                    <input type="text" name="styleCode" value={sneaker.styleCode} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='estimatedRetailPrice' >MSRP: </label>
                    <input type="number" name="estimatedRetailPrice" value={sneaker.estimatedRetailPrice} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='description' >Description: </label>
                    <input type="text" name="description" value={sneaker.description} onChange={handleChange} />
                <br/><br/>
                <label htmlFor='image' >Image: </label>
                    <input type="text" name="image" value={sneaker.image} onChange={handleChange} />
                <br/><br/>
            <button onClick={handleDeleteSubmit}>
                Delete
            </button>
            <br/><br/>
            <input type='submit'/>
            <br/><br/>
            </form>
        </div>
        </>
    )
};

export default Update