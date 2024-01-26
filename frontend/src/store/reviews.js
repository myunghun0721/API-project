import { csrfFetch } from './csrf.js';

export const fetchReviews = (spotId) => async (dispatch) => {
    const req = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await req.json()
    const reviews = data.Reviews
    dispatch(receiveReviews(reviews))
}

export const postReview = ({ spotId, comment, rating }) => async(dispatch) => {
    let star = Number(rating)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review: comment,
            stars: star,
        }),
    });

    const data =  await res.json()
    console.log("🚀 ~ postReview ~ data:", data)

    dispatch(recievePostReview(data))
    return res;
}
const RECIEVE_POST_REVIEW = 'review/POST/RECIEVE_REVIEW'
export const recievePostReview = (review) => ({
    type: RECIEVE_POST_REVIEW,
    review
})

const RECIEVE_REVIEWS = 'reviews/RECIEVE_REVIEWS'
export const receiveReviews = (reviews) => ({
    type: RECIEVE_REVIEWS,
    reviews
})



const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_REVIEWS: {
            const newState = { ...state }
            for (let review of action.reviews) {
                newState[review.id] = review
            }
            return newState
        }
        case RECIEVE_POST_REVIEW: {
            return {...state, [action.review.id]: action.review}
        }
        default:
            return state
    }
}
export default reviewsReducer;
