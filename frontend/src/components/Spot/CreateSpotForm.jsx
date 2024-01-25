import { useEffect, useState } from "react";
import './CreateSpot.css'
function CreateSpotForm() {
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    // const [lat, setLat] = useState("")
    // const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [imgurl1, setImgurl1] = useState("")
    const [imgurl2, setImgurl2] = useState("")
    const [imgurl3, setImgurl3] = useState("")
    const [imgurl4, setImgurl4] = useState("")
    const [imgurl5, setImgurl5] = useState("")
    const [error, setError] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({})
        const formSubmit = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            imgurl1,
            imgurl2: (imgurl2? imgurl2 : null),
            imgurl3: (imgurl3? imgurl3 : null),
            imgurl4: (imgurl4? imgurl4 : null),
            imgurl5: (imgurl5? imgurl5 : null)
        }

        setAddress("")
        setCity("")
        setState("")
        setCountry("")
        setName("")
        setDescription("")
        setPrice("")
        setImgurl1("")
        setImgurl2("")
        setImgurl3("")
        setImgurl4("")
        setImgurl5("")
        // to do dispatch formsubmit
        console.log(formSubmit)
    };

    useEffect(()=>{
        const errorObj = {}
        if(country.length === 0){
            errorObj.country = "Country is required"
        }
        if(address.length === 0){
            errorObj.address = "Address is required"
        }
        if(city.length === 0){
            errorObj.city = "City is required"
        }
        if(state.length === 0){
            errorObj.state = "State is required"
        }
        if(description.length < 30){
            errorObj.description = "Description need a minimum of 30 characters"
        }
        if(description.length === 0){
            errorObj.description = "Description is required"
        }
        if(name.length === 0){
            errorObj.name = "Name is required"
        }
        if(!Number(price)){
            errorObj.price = "Price should be a number"
        }
        if(Number(price) <= 0){
            errorObj.price = "Price per day must be a positive number"
        }
        if(price.length === 0){
            errorObj.price = "Price is required"
        }
        if(!imgurl1.match(/\.(jpeg|jpg|png)$/)){
            errorObj.imgurl1 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if(imgurl1.length === 0){
            errorObj.imgurl1 = "Need preview image URL (House)"
        }
        if(errorObj.imgurl2 && imgurl2.length === 0){
            delete errorObj.imgurl2
        }
        if(imgurl2.length !== 0 && !imgurl2.match(/\.(jpeg|jpg|png)$/)){
            errorObj.imgurl2 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if(errorObj.imgurl3 && imgurl3.length === 0){
            delete errorObj.imgurl3
        }
        if(imgurl3.length !== 0 && !imgurl3.match(/\.(jpeg|jpg|png)$/)){
            errorObj.imgurl3 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if(errorObj.imgurl4 && imgurl4.length === 0){
            delete errorObj.imgurl4
        }
        if(imgurl4.length !== 0 && !imgurl4.match(/\.(jpeg|jpg|png)$/)){
            errorObj.imgurl4 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if(errorObj.imgurl5 && imgurl5.length === 0){
            delete errorObj.imgurl5
        }
        if(imgurl5.length !== 0 && !imgurl5.match(/\.(jpeg|jpg|png)$/)){
            errorObj.imgurl5 = "Image URL must end in .png, .jpg, or .jpeg"
        }

        setError(errorObj)
    }, [address, city, state, country, name, description, price, imgurl1, imgurl2, imgurl3, imgurl4, imgurl5])

    return (
        <div className="div-createSpot-form">
            <div className="div-createSpot-head">
                <h1>Create a new Spot</h1>
                <h3>Where&apos;s your place locationed?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <form className="form-createSpot" onSubmit={handleSubmit}>
                <label>
                    Country:
                    <input type="text" name="country" placeholder={"Country"} value={country} onChange={(e)=> setCountry(e.target.value)}/>
                </label>
                {error.country && <h5>{error.country}</h5>}
                <br />
                <label>
                    Street Address:
                    <input type="text" name="address" placeholder={"Address"} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </label>
                {error.address && <h5>{error.address}</h5>}
                <br />
                <label>
                    City:
                    <input type="text" name="city" placeholder={"City"} value={city} onChange={(e)=> setCity(e.target.value)}/>
                </label>
                {error.city && <h5>{error.city}</h5>}
                <label>
                    State:
                    <input type="text" name="state" placeholder={"State"} value={state} onChange={(e)=>setState(e.target.value)}/>
                </label>
                {error.state && <h5>{error.state}</h5>}
                {/* <label>
                    Latitude:
                    <input type="text" name="lat" placeholder={"Optional but if want to include, input should -90 and 90"} onChange={(e)=>setLat(e.target.value)}/>
                </label>
                <label>
                    Longitude:
                    <input type="text" name="lng" placeholder={"Optional but if want to include, input should  -180 and 180"} onChange={(e)=>setLng(e.target.value)}/>
                </label> */}

                <hr />

                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the meighborhood.</p>
                <label>
                    <textarea type="textarea" name="description" value={description} placeholder={"Please write at least 30 characters"} rows="5" cols="70" onChange={(e)=> setDescription(e.target.value)}/>
                </label>
                {error.description && <h5>{error.description}</h5>}
                <hr />

                <h3>Create a title for your spot</h3>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input type="text" name="name" value={name} placeholder={"Name of your spot"} onChange={(e)=>setName(e.target.value)}/>
                </label>
                {error.name && <h5>{error.name}</h5>}
                <hr />
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    <input type="text" name="price" value={price} placeholder={"$ Price per night (USD)"} onChange={(e)=>setPrice(e.target.value)}/>
                </label>
                {error.price && <h5>{error.price}</h5>}
                <hr />
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <label>
                    <input type="text" name="imgUrl1" value={imgurl1} placeholder={"Preview Image URL (House)"} onChange={(e)=> setImgurl1(e.target.value)}/>
                </label>
                {error.imgurl1 && <h5>{error.imgurl1}</h5>}
                <br></br>
                <label>
                    <input type="text" name="imgUrl2" value={imgurl2} placeholder={"Image URL (Inside of House)"} onChange={(e)=> setImgurl2(e.target.value)}/>
                </label>
                {error.imgurl2 && <h5>{error.imgurl2}</h5>}
                <br></br>
                <label>
                    <input type="text" name="imgUrl3" value={imgurl3} placeholder={"Image URL"} onChange={(e)=> setImgurl3(e.target.value)}/>
                </label>
                {error.imgurl3 && <h5>{error.imgurl3}</h5>}
                <br></br>
                <label>
                    <input type="text" name="imgUrl4" value={imgurl4} placeholder={"Image URL"} onChange={(e)=> setImgurl4(e.target.value)}/>
                </label>
                {error.imgurl4 && <h5>{error.imgurl4}</h5>}
                <br></br>
                <label>
                    <input type="text" name="imgUrl5" value={imgurl5} placeholder={"Image URL"} onChange={(e)=> setImgurl5(e.target.value)}/>
                </label>
                {error.imgurl5 && <h5>{error.imgurl5}</h5>}
                <hr />

                <button type="submit" disabled={Object.values(error).length > 0}>Create Spot</button>
            </form>
        </div>
    );
}
export default CreateSpotForm;
