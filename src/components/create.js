import React, {useState, useEffect} from 'react'
import '../style/style.css'

const Create = (props) => {

    const emptySneaker = {
        brand: "",
        silhouette: "",
        colorway: "",
        nickname: "",
        styleCode: "",
        description: "",
        releaseDate: "",
        estimatedRetailValue: "",
        image: "",
    }

    // ------------------------------
    // Hooks
    // ------------------------------
    const [sneaker, setSneaker] = useState(emptySneaker)

    // ------------------------------
    // Handlers
    // ------------------------------
    const handleChange = (event) => {
        setSneaker({...sneaker, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(sneaker)
        setSneaker({
            brand: "",
            silhouette: "",
            colorway: "",
            nickname: "",
            styleCode: "",
            description: "",
            releaseDate: "",
            estimatedRetailValue: "",
            image: "",    
        })
    }

    // ------------------------------
    // Return
    // ------------------------------
    return (
        <>
            <h3> Add Sneaker</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="brand">Brand: </label>
                    <input type="text" name="brand" value={sneaker.brand} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="silhouette">Silhouette: </label>
                    <input type="text" name="silhouette" value={sneaker.silhouette} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="colorway">Colorway: </label>
                    <input type="text" name="colorway" value={sneaker.colorway} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="nickname">Nickname: </label>
                    <input type="text" name="nickname" value={sneaker.nickname} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="styleCode">Style Code: </label>
                    <input type="text" name="syleCode" value={sneaker.styleCode} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="description">Description: </label>
                    <input type="text" name="description" value={sneaker.description} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="releaseDate">Release Date: </label>
                    <input type="text" name="releaseDate" value={sneaker.releaseDate} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="estimatedRetailValue">Estimated Retail Value: </label>
                    <input type="text" name="estimatedRetailValue" value={sneaker.estimatedRetailValue} onChange={handleChange} />
                        <br/><br/>
                <label htmlFor="image">Image: </label>
                    <input type="text" name="image" value={sneaker.image} onChange={handleChange} />
                        <br/><br/>
                <input type="submit" />
            </form>
        </>
    )
};

export default Create