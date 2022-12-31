import './styles/ConfirmModal.scss'

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-modal">
            <div className='confirm-modal-wrapper'>
                <div className="confirm-modal-message">{message}</div>
                <div className="confirm-modal-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
