import { csrfFetch } from "./csrf";

export const fetchSpotByOwner = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current", {
         method: "GET",
    });

    const data = await response.json();
    const spotsArr = data.Spots

    dispatch(receiveSpotsArr(spotsArr))
    return data;
}

const RECEIEVE_OWNER_SPOTS = 'current/RECEIEVE_OWNER_SPOTS'
export const receiveSpotsArr = (arr) => ({
    type: RECEIEVE_OWNER_SPOTS,
    arr
})

const initialState = {
    spot: []
}

const currentReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIEVE_OWNER_SPOTS: {
            return { ...state, spot: action.arr}
        }
        default:
            return state;
    }
}

export default currentReducer;
