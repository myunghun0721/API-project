import { useParams } from 'react-router-dom'
import './Spot.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSpotDetail } from '../../store/spots'
import { fetchReviews } from '../../store/reviews'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import PostReviewModal from '../PostReviewModal'



function SpotDetail() {
    let { spotId } = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots)
    const spotReviews = useSelector(state => state.reviews)

    const spotDetail = spots[spotId]

    useEffect(() => {
        dispatch(fetchSpotDetail(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(fetchReviews(spotId));
    }, [dispatch, spotId]);


    if (!spotDetail) return null
    if (!spotReviews) return null

    const spotImages = spotDetail.SpotImages
    if (!spotImages) return null

    const spotReviewsArr = Object.values(spotReviews)
    if (!spotReviewsArr) return null
    console.log("🚀 ~ SpotDetail ~ spotReviewsArr:", spotReviewsArr)

    spotReviewsArr.sort(function (a, b) {
        return b.createdAt - a.createdAt
    })
    const owner = spotDetail.Owner


    return (
        <div>

            <h2 className='spot-header'>Details of spot: {spotDetail && spotDetail.name}</h2>
            <div className='div-spotDetail-img-container'>
                {spotImages && spotImages.map((img) => (
                    <div key={img.id} className={`div-spotDetail-img${img.id}`}>
                        <img key={img.id} src={`${img.url}`} alt='spot detail img' />
                    </div>
                ))}
                {spotImages && spotImages.length < 1 ? <div className='div-spotDetail-img1'><img key={1} src='https://placehold.co/315x325?text=Place+Holder' alt='placeholder img' /> </div> : null}
                {spotImages && spotImages.length < 2 ? <div className='div-spotDetail-img2'><img key={2} src='https://placehold.co/315x325?text=Place+Holder' alt='placeholder img' /> </div> : null}
                {spotImages && spotImages.length < 3 ? <div className='div-spotDetail-img3'><img key={3} src='https://placehold.co/315x325?text=Place+Holder' alt='placeholder img' /> </div> : null}
                {spotImages && spotImages.length < 4 ? <div className='div-spotDetail-img4'><img key={4} src='https://placehold.co/315x325?text=Place+Holder' alt='placeholder img' /> </div> : null}
                {spotImages && spotImages.length < 5 ? <div className='div-spotDetail-img5'><img key={5} src='https://placehold.co/315x325?text=Place+Holder' alt='placeholder img' /> </div> : null}
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
                        {spotDetail.avgStarRating ? <h2><i className="fa-solid fa-star"></i>: {(spotDetail.avgStarRating / spotDetail.numReviews).toFixed(2)}</h2> : <h2><i className="fa-solid fa-star"></i>: NEW!</h2>}
                        {spotDetail.numReviews !== 0 ? <p id='centerDot'>&#183;</p> : null}
                        {spotDetail.numReviews == 1 ? <h2>{spotDetail.numReviews} Reveiw</h2> : spotDetail.numReviews > 1 ? <h2>{spotDetail.numReviews} Reveiws</h2> : null}

                    </div>
                    <button onClick={() => alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <hr />
            <div className='div-review-spotDetail'>
                <div className='div-review-star-review-count'>
                    {spotDetail.avgStarRating ? <h2><i className="fa-solid fa-star"></i>: {(spotDetail.avgStarRating / spotDetail.numReviews).toFixed(2)}</h2> : <h2><i className="fa-solid fa-star"></i>: NEW!</h2>}
                    {spotDetail.numReviews !== 0 ? <p id='centerDot'>&#183;</p> : null}
                    {spotDetail.numReviews == 1 ? <h2>{spotDetail.numReviews} Reveiw</h2> : spotDetail.numReviews > 1 ? <h2>{spotDetail.numReviews} Reveiws</h2> : null}

                </div>

                <button id='postReviewButton'>
                    <OpenModalMenuItem
                        itemText="Post Your Review"
                        modalComponent={<PostReviewModal spotId={spotId} />}
                    />
                </button>
                    {spotReviewsArr && spotReviewsArr.map(review => {
                        if (Number(review.spotId) === Number(spotId)) {
                            return <div key={review.id} className='div-spot-review'>
                                <h3>{review.User.firstName} {review.User.lastName}</h3>
                                <p>{review.createdAt.split('T')[0]}</p>
                                <p>{review.review}</p>
                            </div>
                        }
                    })}

                    {/* {firstReview} */}
            </div>
        </div>
    )
}

export default SpotDetail
