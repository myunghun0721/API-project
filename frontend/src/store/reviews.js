import { csrfFetch } from './csrf.js';

export const fetchReviews = () => async (dispatch) => {
    const req = await csrfFetch('/api/spots')
    const data = await req.json()
    const spots = data.Spots
    dispatch(receiveSpots(spots))

}
