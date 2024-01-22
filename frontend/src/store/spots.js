export const fetchSpots = () => async (dispatch) => {
    const req = await fetch('/api/spots')
    const data = await req.json()
    const spots = data.Spots
    dispatch(receiveSpots(spots))

}

const RECEIVE_SPOTS = 'spots/RECEIVE_SPOTS'
export const receiveSpots = (spots) => ({
    type: RECEIVE_SPOTS,
    spots
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
        default:
            return state;
    }
}

export default spotsReducer;
