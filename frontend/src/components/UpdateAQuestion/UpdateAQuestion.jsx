import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { updateAQuestionThunk } from '../../store/question';
import "./UpdateAQuestion.css"


function UpdateAQuestion() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const sessionUser = useSelector((state) => state.session.user);
    const question = useSelector((state) => state.questions.byId[id]);
    
    const [questionBody, setQuestionBody] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [errors, setErrors] = useState({});

    //
    useEffect(() => {

        if (question) {
            setQuestionBody(question.questionBody);
            const urls= question.questionImage.map(image => image.url); 
            setImageUrls([
                urls[0] || '', 
                urls[1] || '',
                urls[2] || ''
            ])
        
        }
    }, [question]);


    useEffect(() => {
        const newErrors = {};

        if (!questionBody) {
            newErrors.questionBody = "You must write something before posting"
        } else if (questionBody.length < 5) {
            newErrors.questionBody = "A post must be at least 5 characters"
        } else if (questionBody.length > 2000) {
            newErrors.questionBody = "Please keep your post under 2000 characters"
        }

        if(!imageUrls[0]?.trim()){
            newErrors.imageUrls = 'At least one image is required'
        }

        setErrors(newErrors)
    }, [questionBody, imageUrls])

    if (!sessionUser) return <Navigate to="/" replace={true} />;

    const handleImageChange = (id, value) => {
        const copyImages = [...imageUrls];
        copyImages[id] = value;
        setImageUrls(copyImages);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(Object.keys(errors).length) return;

        const serverResponse = await dispatch(
            updateAQuestionThunk((id), {
                questionBody,
                imageUrls
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate(`/questions/${id}`);
        }
    };

    if (!question) {
        return <div>Loading post details...</div>
    }

    return (
        <div className="update-container">
            <h2 id='update-post'>Update a Post</h2>

            <form className="image-container" onSubmit={handleSubmit}>
                <label className='update-input'>
                    Product Name
                    <input className="input-container"
                        type="text"
                        value={questionBody}
                        onChange={(e) => setQuestionBody(e.target.value)}
                        required
                    />
                </label>
                
                {errors.imageUrls && <p className="error-message">{errors.imageUrls}</p>}
                <label className='create-input'>
                    Preview Image
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        handleImageChange(0, e.target.value)
                    }}
                        value={imageUrls[0]}
                    />
                </label>
                <label className='create-input'>
                    Image #2
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        handleImageChange(1, e.target.value)
                    }}
                        value={imageUrls[1]}
                    />
                </label>
                <label className='create-input'>
                    Image #3
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        handleImageChange(2, e.target.value)
                    }}
                        value={imageUrls[2]}
                    />
                </label>

                <button className="update-button-container" type="submit">Update Product</button>


            </form>
        </div>
    );
}

export default UpdateAQuestion;

