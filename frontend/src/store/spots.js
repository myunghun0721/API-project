import { csrfFetch } from './csrf.js';

export const fetchSpotDetail = (spotId) => async (dispatch) => {
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
export const createSpot = ({ address, city, state, country, name, lat, lng, description, price }) => async (dispatch) => {
    console.log({ address, city, state, country, name, lat, lng, description, price })
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({ address, city, state, country, name, lat, lng, description, price })
    });
    const data = await res.json();
    dispatch(postSpot(data))
    const newId = data.id
    return newId

}
export const postSpotImg = ({id, url, preview}) => async () => {
    const res = await csrfFetch(`/api/spots/${id}/images`, {
        method: "POST",
        body: JSON.stringify({
            url,
            preview,
        }),
    });

    return res

}

const POST_SPOT = 'spot/POST_SPOT'
export const postSpot = (spot) => ({
    type: POST_SPOT,
    spot,
});
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
        case RECEIVE_SPOTDETAIL: {
            // console.log(action.spotDetail.id)
            const newState = { [action.spotDetail.id]: action.spotDetail }
            return newState
        }
        case POST_SPOT: {
            return { ...state, newspot: action.spot };
        }
        default:
            return state;
    }
}

export default spotsReducer;
