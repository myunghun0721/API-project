import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { fetchSpotDetail, updateSpot } from "../../../store/spots";


function UpdateSpot() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState({})
    const spot = useSelector((state) => state.spots);
    const currentSpot = spot[spotId]




    useEffect(() => {
        dispatch(fetchSpotDetail(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        if (currentSpot) {
            setAddress(currentSpot.address)
            setCity(currentSpot.city)
            setState(currentSpot.state)
            setCountry(currentSpot.country)
            setLat(currentSpot.lat)
            setLng(currentSpot.lng)
            setName(currentSpot.name)
            setDescription(currentSpot.description)
            setPrice(currentSpot.price)


        }
    }, [currentSpot]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({})
        const formSubmit = {
            spotId,
            address,
            city,
            state,
            country,
            name,
            description,
            lat,
            lng,
            price,
        }
        // to do dispatch formsubmit
        const returnSpotId = await dispatch(updateSpot(formSubmit))




        setAddress("")
        setCity("")
        setState("")
        setCountry("")
        setName("")
        setDescription("")
        setLat("")
        setLng("")
        setPrice("")


        navigate(`/spots/${returnSpotId.id}`)
    };


    useEffect(() => {
        const errorObj = {}
        if (country.length === 0) {
            errorObj.country = "Country is required"
        }
        if (address.length === 0) {
            errorObj.address = "Address is required"
        }
        if (city.length === 0) {
            errorObj.city = "City is required"
        }
        if (state.length === 0) {
            errorObj.state = "State is required"
        }
        if (description.length < 30) {
            errorObj.description = "Description need a minimum of 30 characters"
        }
        if (description.length === 0) {
            errorObj.description = "Description is required"
        }
        if (name.length === 0) {
            errorObj.name = "Name is required"
        }
        if (!Number(price)) {
            errorObj.price = "Price should be a number"
        }
        if (Number(price) <= 0) {
            errorObj.price = "Price per day must be a positive number"
        }
        if (price.length === 0) {
            errorObj.price = "Price is required"
        }

        if (lat.length === 0) {
            errorObj.lat = "Latitude is required"
        }
        if (Number(lat) > 90 || Number(lat) < -90) {
            errorObj.lat = "Latitude must be within -90 and 90"
        }
        if (lng.length === 0) {
            errorObj.lng = "Longitude is required"
        }
        if (Number(lng) > 180 || Number(lng) < -180) {
            errorObj.lng = "Longitude must be within -180 and 180"
        }

        setError(errorObj)
    }, [address, city, state, country, name, description, price, lat, lng])

    return (
        <div className="div-createSpot-form">
            <div className="div-createSpot-head">
                <h1>Update your Spot</h1>
                <h3>Where&apos;s your place locationed?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <form className="form-createSpot" onSubmit={handleSubmit}>
                <label>
                    Country:
                    <input type="text" name="country" placeholder={"Country"} value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                {error.country && <h5>{error.country}</h5>}
                <br />
                <label>
                    Street Address:
                    <input type="text" name="address" placeholder={"Address"} value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                {error.address && <h5>{error.address}</h5>}
                <br />
                <label>
                    City:
                    <input type="text" name="city" placeholder={"City"} value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                {error.city && <h5>{error.city}</h5>}
                <label>
                    State:
                    <input type="text" name="state" placeholder={"State"} value={state} onChange={(e) => setState(e.target.value)} />
                </label>
                {error.state && <h5>{error.state}</h5>}
                <label>
                    Latitude:
                    <input type="number" name="lat" placeholder={"Latitude must be within -90 and 90"} value={lat} onChange={(e) => setLat(e.target.value)} />
                </label>
                {error.lat && <h5>{error.lat}</h5>}
                <label>
                    Longitude:
                    <input type="number" name="lng" placeholder={"Longitude must be within -180 and 180"} value={lng} onChange={(e) => setLng(e.target.value)} />
                </label>
                {error.lng && <h5>{error.lng}</h5>}
                <hr />

                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label>
                    <textarea type="textarea" name="description" value={description} placeholder={"Please write at least 30 characters"} rows="5" cols="70" onChange={(e) => setDescription(e.target.value)} />
                </label>
                {error.description && <h5>{error.description}</h5>}
                <hr />

                <h3>Create a title for your spot</h3>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input type="text" name="name" value={name} placeholder={"Name of your spot"} onChange={(e) => setName(e.target.value)} />
                </label>
                {error.name && <h5>{error.name}</h5>}
                <hr />
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    <input type="number" name="price" value={price} placeholder={"$ Price per night (USD)"} onChange={(e) => setPrice(e.target.value)} />
                </label>
                {error.price && <h5>{error.price}</h5>}
                <hr />

                <button type="submit" disabled={Object.values(error).length > 0}>Update your Spot</button>
                {/* <button type="submit" >test</button> */}
            </form>
        </div>
    );
}
export default UpdateSpot;
