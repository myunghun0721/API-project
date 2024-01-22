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
                        {spot.previewImage ? <p>{spot.previewImage}</p> : <p>no preview img</p>}
                        <p>{spot.city}, {spot.state}</p>
                        <p>${spot.price} per night</p>
                        <p>R:{spot.avgRating}</p>
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
