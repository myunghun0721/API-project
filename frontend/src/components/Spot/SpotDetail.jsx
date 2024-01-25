import { useParams } from 'react-router-dom'
import './Spot.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSpotDetail } from '../../store/spots'
import { fetchReviews } from '../../store/reviews'

function SpotDetail() {
    const sessionUser = useSelector(state => state.session.user);
    console.log("🚀 ~ SpotDetail ~ sessionUser:", sessionUser)
    const { spotId } = useParams()
    const reviews = useSelector(state => state.reviews)
    const spots = useSelector(state => state.spots)
    const reviewArr = Object.values(reviews)
    const spotDetail = spots[spotId];
    console.log("🚀 ~ SpotDetail ~ spotDetail:", spotDetail)
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
        dispatch(fetchReviews(spotId))
    }, [dispatch, avgRating])

    let myArr = []
    reviewArr.forEach(spotreview => {
        if (Number(spotreview.spotId) === Number(spotId)) {
            myArr.push(spotreview)
        }
    })
    myArr.sort(function(a, b){
        return b.createdAt - a.createdAt
    })

    if (spotDetail) {
        return (
            <div>
                <h2 className='spot-header'>Details of spot: {spotDetail && spotDetail.name}</h2>
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
                        <div className='div-center-dot'>
                            {rating ? <h2><i className="fa-solid fa-star"></i>: {rating}</h2> : <h2><i className="fa-solid fa-star"></i>: NEW!</h2>}
                            {myArr.length !== 0 ? <p id='centerDot'>&#183;</p> : null}
                            {myArr.length === 1 ? <h2>{Number(spotDetail.numReviews)} Review</h2> : myArr.length > 1 ? <h2>{Number(spotDetail.numReviews)} reviews</h2> : null}
                        </div>
                        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
                    </div>
                </div>
                <hr />
                <div className='div-review-spotDetail'>
                    <div className='div-review-star-review-count'>

                        {rating ? <h2><i className="fa-solid fa-star"></i>: {rating}</h2> : <h2><i className="fa-solid fa-star"></i>: NEW!</h2>}
                        {myArr.length !== 0 ? <p id='centerDot'>&#183;</p> : null}
                        {myArr.length === 1 ? <h2>{Number(spotDetail.numReviews)} Review</h2> : myArr.length > 1 ? <h2>{Number(spotDetail.numReviews)} reviews</h2> : null}
                    </div>
                    {reviewArr && reviewArr.map(review => {
                        if (Number(review.spotId) === Number(spotId)) {
                            return <div key={review.id} className='div-spot-review'>
                                <h3>{review.User.firstName} {review.User.lastName}</h3>
                                <p>{review.createdAt.split('T')[0]}</p>
                                <p>{review.review}</p>
                            </div>
                        }
                    })}
                    {owner && myArr.length === 0 && sessionUser.id !== owner.id && <p>Be the first to post a review!</p>}
                </div>
            </div>
        )
    }
}

export default SpotDetail
