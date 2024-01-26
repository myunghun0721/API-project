import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { deleteSpot } from '../../store/spots';
import { fetchSpotByOwner } from '../../store/spotByOwner';

function DeleteSpotModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()


    function noButton() {
        closeModal()
    }
    async function yesButton() {

        await dispatch(deleteSpot(spotId))
        await dispatch(fetchSpotByOwner())
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


export default DeleteSpotModal;
