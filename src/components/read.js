import React, {useState, useEffect} from 'react'
import '../style/style.css'

const Read = (props) => {

    const [sneaker, setSneaker] = useState({...props.sneaker})

    return (
        <>
            <div className="read">
                <div className="showList">
                    <ul>
                        <li className="itemName">&emsp; Release date: {sneaker.releaseDate}
                        </li><li className="itemName">&emsp; {sneaker.brand} {sneaker.silhouette} "{sneaker.nickname}"
                        </li>
                        <li className="itemName">&emsp; {sneaker.colorway}
                        </li>
                        <li className="itemName">&emsp; {sneaker.styleCode}
                        </li>
                        <li className="itemName">&emsp; {sneaker.description}
                        </li>
                        <li className="itemName">&emsp; MSRP: ${sneaker.estimatedRetailPrice}
                            <br/><br/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Read