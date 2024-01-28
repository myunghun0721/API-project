import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './PostReviewModal.css';
import { fetchReviews, postReview } from '../../store/reviews';
import { fetchSpotDetail } from '../../store/spots';

function PostReviewModal({ spotId }) {

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [rating, setRating] = useState(0)
  const [activeRating, setActiveRating] = useState(rating)
  const [comment, setComment] = useState("")
  let disabled = false;
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const form = {
      rating,
      comment,
      spotId
    }

    await dispatch(postReview(form)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data) {
        setErrors(data)
      }
    })

    await dispatch(fetchReviews(spotId));
    await dispatch(fetchSpotDetail(spotId));
    closeModal();
  };

  useEffect(() => {
    const errorObj = {}
    if (comment.length < 10) {
      errorObj.comment = "comment need a minimum of 10 characters"
    }
    if(Number(activeRating) === 0){
      errorObj.star = "Stars must be from 1 to 5"
    }

    setErrors(errorObj)
  }, [comment, activeRating])

  return (
    <div className='div-modal-login'>
      <h1>How was your stay?</h1>
      {errors.message && <h5>{errors.message}</h5>}
      <form className='div-review-modal-form' onSubmit={handleSubmit}>
        <label>
          <textarea type="textarea" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={"Leave your review here..."} rows="6" cols="55" />
        </label>
        {errors.comment && <h5>{errors.comment}</h5>}
        <div className="rating-input">
          <div onMouseEnter={() => { if (!disabled) setActiveRating(1) }} onMouseLeave={() => { setActiveRating(rating) }} className={activeRating >= 1 ? "filled" : "empty"} >
            <i onClick={() => setRating(parseInt(1))} className="fa fa-star"></i>
          </div>
          <div onMouseEnter={() => { if (!disabled) setActiveRating(2) }} onMouseLeave={() => { setActiveRating(rating) }} className={activeRating >= 2 ? "filled" : "empty"} >
            <i onClick={() => setRating(parseInt(2))} className="fa fa-star"></i>
          </div>
          <div onMouseEnter={() => { if (!disabled) setActiveRating(3) }} onMouseLeave={() => { setActiveRating(rating) }} className={activeRating >= 3 ? "filled" : "empty"} >
            <i onClick={() => setRating(parseInt(3))} className="fa fa-star"></i>
          </div>
          <div onMouseEnter={() => { if (!disabled) setActiveRating(4) }} onMouseLeave={() => { setActiveRating(rating) }} className={activeRating >= 4 ? "filled" : "empty"} >
            <i onClick={() => setRating(parseInt(4))} className="fa fa-star"></i>
          </div>
          <div onMouseEnter={() => { if (!disabled) setActiveRating(5) }} onMouseLeave={() => { setActiveRating(rating) }} className={activeRating >= 5 ? "filled" : "empty"} >
            <i onClick={() => setRating(parseInt(5))} className="fa fa-star"></i>
          </div>
        </div>
        {errors.star && <h5>{errors.star}</h5>}
        <button type="submit" disabled={Object.values(errors).length > 0}>Submit Your Review</button>
      </form>
    </div>
  );
}

export default PostReviewModal;
