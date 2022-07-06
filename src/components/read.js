import React, {useState, useEffect} from 'react'
import '../style/style.css'

const Read = (props) => {

    const [sneaker, setSneaker] = useState({...props.sneaker})

    return (
        <>
            <div className="read">
                <div className="showList">
                    <ul>
                        {/* <li>Release date: {sneaker.releaseDate}</li> */}
                        <li className="itemName">{sneaker.brand} {sneaker.silhouette} "{sneaker.nickname}"</li>
                        <li className="itemName">{sneaker.colorway}</li>
                        <li className="itemName">{sneaker.styleCode}</li>
                        <li className="itemName">MSRP: ${sneaker.estimatedRetailPrice}</li>
                        <li className="itemName">{sneaker.description}</li>
                            <br/><br/>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Read