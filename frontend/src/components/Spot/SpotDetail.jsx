import { useParams } from 'react-router-dom'
import './Spot.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSpotDetail } from '../../store/spots'

function SpotDetail() {
    const { spotId } = useParams()
    const spots = useSelector(state => state.spots)
    const spotDetail = spots[spotId];
    const [rating, setRating] = useState(0)
    let imgArr;
    let owner;
    let avgRating = 0;
    if (spotDetail) {
        imgArr = spotDetail.SpotImages
        owner = spotDetail.Owner
        avgRating = spotDetail.avgStarRating / spotDetail.numReviews
    }

    const dispatch = useDispatch()
    useEffect(() => {
        setRating(avgRating)
        dispatch(fetchSpotDetail(spotId))
    }, [dispatch, avgRating])


    if (spotDetail) {
        return (
            <div>
                <h2 className='spot-header'>{spotDetail && spotDetail.name}</h2>
                <div className='div-spotDetail-img-container'>
                    {imgArr && imgArr.map((img) => (
                        <div key={img.id} className={`div-spotDetail-img${img.id}`}>
                            <img key={img.id} src={`${img.url}`} alt='spot detail img' />
                        </div>
                    ))}
                    {imgArr && imgArr.length < 1 ? <div className='div-spotDetail-img1'><img key={1} src='https://placehold.co/315x325' alt='placeholder img' /> </div> : null}
                    {imgArr && imgArr.length < 2 ? <div className='div-spotDetail-img2'><img key={2} src='https://placehold.co/315x325' alt='placeholder img' /> </div> : null}
                    {imgArr && imgArr.length < 3 ? <div className='div-spotDetail-img3'><img key={3} src='https://placehold.co/315x325' alt='placeholder img' /> </div> : null}
                    {imgArr && imgArr.length < 4 ? <div className='div-spotDetail-img4'><img key={4} src='https://placehold.co/315x325' alt='placeholder img' /> </div> : null}
                    {imgArr && imgArr.length < 5 ? <div className='div-spotDetail-img5'><img key={5} src='https://placehold.co/315x325' alt='placeholder img' /> </div> : null}
                </div>
                <div className='div-spotDetail'>
                    <div className='div-details-owner'>

                        {owner && <h2>Hosted by: {owner.firstName}, {owner.lastName}</h2>}
                        {spotDetail && <p>{spotDetail.city} {spotDetail.state}, {spotDetail.country}</p>}
                        <p>Description of spot: {spotDetail.description}</p>
                    </div>
                    <div className='div-reserve-button'>
                        {spotDetail && <h3>${spotDetail.price} per night</h3>}
                        {rating ? <p><i className="fa-solid fa-star"></i>: {rating}</p> : <p><i className="fa-solid fa-star"></i>: NEW!</p>}
                        <button onClick={()=>alert("Feature coming soon")}>Reserve</button>
                    </div>
                </div>
                <hr />
                {/* <div className='div-review-spotDetail'>
                    {rating ? <p><i className="fa-solid fa-star"></i>: {rating}</p> : <p><i className="fa-solid fa-star"></i>: NEW!</p>}
                </div> */}
            </div>
        )
    }
}

export default SpotDetail
