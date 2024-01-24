import { csrfFetch } from './csrf.js';

export const fetchReviews = (spotId) => async (dispatch) => {
    const req = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await req.json()
    const reviews = data.Reviews
    dispatch(receiveReviews(reviews))
}

const RECIEVE_REVIEWS = 'reviews/RECIEVE_REVIEWS'
export const receiveReviews = (reviews) =>({
    type: RECIEVE_REVIEWS,
    reviews
})

const reviewsReducer = (state = {}, action) =>{
    switch(action.type){
        case RECIEVE_REVIEWS: {
            const newState = { ...state }
            for (let review of action.reviews) {
                newState[review.id] = review
            }
            return newState
        }

        default:
        return state
    }
}
export default reviewsReducer;
