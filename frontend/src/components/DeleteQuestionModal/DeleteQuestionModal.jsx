import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteAQuestionThunk } from '../../store/question';
import './DeleteQuestionModal.css';
import { useNavigate } from "react-router-dom";


const DeleteQuestionModal= ({ questionId, setQuestionId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteAQuestionThunk(questionId));
        closeModal();
        navigate("/")
    };

    return (
        <div className="question-form-container">
            <h1 id="heading">Confirm Delete</h1>
            <div>Are you sure you want to delete this question?</div>
            <button onClick={handleClickDelete} className="delete-question-button">
                Yes (Delete Question)
            </button>
            <button onClick={() => setQuestionId(null)} className="keep-question-button">
                No (Keep Question)
            </button>
        </div>
    );
};

export default DeleteQuestionModal;