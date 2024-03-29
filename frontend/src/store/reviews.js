import { csrfFetch } from './csrf.js';

export const deleteReview = (reviewId) => async (dispatch) => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });

    dispatch(receiveDeleteReview(reviewId));
}

export const fetchReviews = (spotId) => async (dispatch) => {
    const req = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await req.json()
    const reviews = data.Reviews
    dispatch(receiveReviews(reviews))
}

export const postReview = ({ spotId, comment, rating }) => async (dispatch) => {
    let star = Number(rating)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review: comment,
            stars: star,
        }),
    });

    const data = await res.json()
    console.log("🚀 ~ postReview ~ data:", data)

    dispatch(fetchReviews(spotId))
    return res;
}
// const RECIEVE_POST_REVIEW = 'review/POST/RECIEVE_REVIEW'
// export const recievePostReview = (review) => ({
//     type: RECIEVE_POST_REVIEW,
//     review
// })

const RECIEVE_REVIEWS = 'reviews/RECIEVE_REVIEWS'
export const receiveReviews = (reviews) => ({
    type: RECIEVE_REVIEWS,
    reviews
})

const DELETE_REVIEW = 'review/DELETE_REVIEW'
export const receiveDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId]
            return newState;
        }
        // case RECIEVE_POST_REVIEW: {
        //     // return {...state, [action.review.id]: action.review}
        //     return state
        // }
        default:
            return state
    }
}
export default reviewsReducer;
