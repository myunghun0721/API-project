import { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
function Home() {
    const spots = useSelector(state => state.spots)
    const spotArr = Object.values(spots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])



    return (
        <>
            <hr />
            <div className='div-spots-container'>
                {spotArr.map(spot => (
                    <NavLink to={`/spotDetail/${spot.id}`} className='div-spots' key={spot.id}>
                        {/* {console.log(spot)} */}
                        {spot.previewImage !== 'No preview image' ? <img src={`${spot.previewImage}`} alt='animal crossing villager img' /> : <img src='https://placehold.co/315x325' alt='placeholder img' />}
                        <div>
                            <h3>{spot.name}</h3>
                            <p>{spot.description}</p>
                            <p>{spot.city}, {spot.state}</p>
                            <label>${spot.price} per night</label>

                            {spot.avgRating ? <p><i className="fa-solid fa-star"></i>: {spot.avgRating}</p> : <p><i className="fa-solid fa-star"></i>: NEW!</p>}
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Home

/*
address
:
"7810 normal street"
avgRating
:
5
city
:
"normal"
country
:
"normal country"
createdAt
:
"2024-01-07T02:28:38.914Z"
description
:
"User Three fancy testing seed no.2"
id
:
15
lat
:
11.7645358
lng
:
-65.4730327
name
:
"NORMAL"
ownerId
:
3
previewImage
:
"No preview image"
price
:
345
state
:
"NM"
updatedAt
:
"2024-01-07T02:28:38.914Z"
*/
