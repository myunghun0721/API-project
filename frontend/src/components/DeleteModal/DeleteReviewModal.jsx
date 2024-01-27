import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { deleteReview, fetchReviews } from '../../store/reviews';
import { fetchSpotDetail } from '../../store/spots';

function DeleteReviewModal({ reviewId, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()


    function noButton() {
        closeModal()
    }
    async function yesButton() {
        await dispatch(deleteReview(reviewId))
        await dispatch(fetchReviews(spotId));
        await dispatch(fetchSpotDetail(spotId));
        closeModal()
    }
    return (
        <div id="deleteModal" className='div-modal-login'>
            <h1>Confirm Delete</h1>

            <div className="button-confirm">
                <button id="yes" onClick={yesButton}>
                    Yes (DELETE Spot)
                </button>
                <button id="no" onClick={noButton}>
                    No (Keep Spot)
                </button>
            </div>
        </div>
    );
}


export default DeleteReviewModal;
