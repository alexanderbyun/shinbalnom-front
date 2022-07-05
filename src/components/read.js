import React, {useState, useEffect} from 'react'
import '../style/style.css'

const Read = (props) => {

    const [sneaker, setSneaker] = useState({...props.sneaker})

    return (
        <>
            <div className="read">
                <h4>{sneaker.brand}</h4>
                <div className="showList">
                    <ul>
                        <li className="item">Brand: </li>
                        <li className="itemName">&emsp; {sneaker.brand}
                            <br/><br/>
                        </li>
                        <li className="item">Silhouette: </li>
                        <li className="itemName">&emsp; {sneaker.silhouette}
                            <br/><br/>
                        </li>
                        <li className="item">Colorway: </li>
                        <li className="itemName">&emsp; {sneaker.colorway}
                            <br/><br/>
                        </li>
                        <li className="item">Nickname: </li>
                        <li className="itemName">&emsp; {sneaker.nickname}
                            <br/><br/>
                        </li>
                        <li className="item">Style Code: </li>
                        <li className="itemName">&emsp; {sneaker.styleCode}
                            <br/><br/>
                        </li>
                        <li className="item">Description: </li>
                        <li className="itemName">&emsp; {sneaker.description}
                            <br/><br/>
                        </li>
                        <li className="item">Release Date: </li>
                        <li className="itemName">&emsp; {sneaker.releaseDate}
                            <br/><br/>
                        </li>
                        <li className="item">MSRP: </li>
                        <li className="itemName">&emsp; {sneaker.estimatedRetailPrice}
                            <br/><br/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Read