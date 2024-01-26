import { csrfFetch } from './csrf.js';
import { fetchSpotByOwner } from './spotByOwner.js';

export const deleteSpot = (spotId) => async (dispatch) => {
    await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    dispatch(receiveDeleteSpot(spotId));
};

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
export const postSpotImg = ({ id, url, preview }) => async () => {
    const res = await csrfFetch(`/api/spots/${id}/images`, {
        method: "POST",
        body: JSON.stringify({
            url,
            preview,
        }),
    });

    return res

}
export const updateSpot = ({ spotId, country, address, city, state, lat, lng, description, name, price }) => async (dispatch) => {
    // console.log('from updat spot', spotId)
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify({
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
        }),
    });

    const data = await res.json();
    dispatch(receiveUpdatdSpot(data))
    return data;
}

const DELETE_POST = 'spot/DELETE_POST'
export const receiveDeleteSpot = (spotId) => ({
    type: DELETE_POST,
    spotId
})

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

const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const receiveUpdatdSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})


const initialState = { updatedSpot: [], spot: [] };
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SPOTS: {
            return { ...state, spot: action.spots };
        }
        case RECEIVE_SPOTDETAIL: {
            // console.log(action.spotDetail.id)
            const newState = { [action.spotDetail.id]: action.spotDetail }
            return newState
        }
        case POST_SPOT: {
            return { ...state, newspot: action.spot };
        }
        case UPDATE_SPOT: {
            return { ...state, updateSpot: action.spot }
        }
        case DELETE_POST: {
            const newState = { ...state };
            delete newState[action.spotId]
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
