import { csrfFetch } from './csrf.js';

export const fetchSpotDetail = (spotId) => async (dispatch)=>{
    const req = await csrfFetch(`/api/spots/${spotId}`)
    const data = await req.json()
    dispatch(receiveSpotDetail(data))
}
export const fetchSpots = () => async (dispatch) => {
    const req = await csrfFetch('/api/spots')
    const data = await req.json()
    const spots = data.Spots
    dispatch(receiveSpots(spots))

}

const RECEIVE_SPOTS = 'spots/RECEIVE_SPOTS'
export const receiveSpots = (spots) => ({
    type: RECEIVE_SPOTS,
    spots
})
const RECEIVE_SPOTDETAIL = 'spots/RECEIVE_SPOTDETAIL'
export const receiveSpotDetail = (spotDetail) => ({
    type: RECEIVE_SPOTDETAIL,
    spotDetail
})

const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SPOTS: {
            const newState = { ...state }
            for (let spot of action.spots) {
                newState[spot.id] = spot
            }
            return newState
        }
        case RECEIVE_SPOTDETAIL:{
            // console.log(action.spotDetail.id)
            const newState = {[action.spotDetail.id]: action.spotDetail}
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer;
