import { useParams } from 'react-router-dom'
import './Spot.css'

function SpotDetail(){
    const {spotId} = useParams()
    return (
        <div>
            <h1>this is spot detail page {spotId}</h1>
        </div>
    )
}

export default SpotDetail
