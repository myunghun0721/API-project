import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotByOwner } from "../../store/spotByOwner";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './SpotByOwner.css'
import DeleteSpotModal from "../DeleteModal";

function SpotByOwner() {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.current.spot)
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate()


    if (!sessionUser) return null
    const id = sessionUser.id

    useEffect(() => {
        dispatch(fetchSpotByOwner())
    }, [dispatch, id])


    function updateSpot(e, spotId) {
        e.preventDefault();
        navigate(`/spots/${spotId}/edit`)
    }
    function deleteButton(e) {
        e.preventDefault();
    }
    return (
        <>
            <hr />
            <h1>Manage your Spots</h1>
            {sessionUser && <button id="manageCreateButton"><NavLink to="/spots/new" className={`a-createSpot`}>Create a New Spot</NavLink></button>}
            {spots.length > 0 ? <div className='div-spots-container'>
                {spots.map(spot => (
                    <NavLink to={`/spots/${spot.id}`} className='div-spots' key={spot.id}>
                        {/* {console.log(spot)} */}
                        {spot.previewImage !== 'No preview image' ? <img src={`${spot.previewImage}`} alt='animal crossing villager img' /> : <img src='https://placehold.co/315x325' alt='placeholder img' />}
                        <div className='div-spots-description-holder'>
                            {/* <div className='div-spots-tooltiptext'>
                                <h3>{spot.name}</h3>
                                <p>{spot.description}</p>
                            </div> */}
                            <div className='div-spots-city-state-rating'>
                                <p>{spot.city}, {spot.state}</p>

                                {spot.avgRating ? <p><i className="fa-solid fa-star"></i>: {spot.avgRating.toFixed(2)}</p> : <p><i className="fa-solid fa-star"></i>: NEW!</p>}

                            </div>
                            <label>${spot.price} per night</label>
                            <div className="div-button-holder">
                                <button onClick={(e) => updateSpot(e, spot.id)}><p>Update</p></button>

                                <button onClick={(e) => deleteButton(e)}>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        //     onItemClick={closeMenu}
                                        modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                    />
                                </button>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div> :
                null
            }
        </>
    )
}

export default SpotByOwner;
