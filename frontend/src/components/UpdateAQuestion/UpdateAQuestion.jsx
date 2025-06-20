import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { updateAQuestionThunk } from '../../store/question';


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
        // questionImage.push({ url: previewImage.url, preview: true })
        // secondImage.url.length ? product_images.push({ url: secondImage.url, preview: false }) : null
        // thirdImage.url.length ? product_images.push({ url: thirdImage.url, preview: false }) : null
        // fourthImage.url.length ? product_images.push({ url: fourthImage.url, preview: false }) : null
        // fifthImage.url.length ? product_images.push({ url: fifthImage.url, preview: false }) : null
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
                
                {/* <label className='create-input'>
                    Preview Product Image
                    <input className='input-container' placeholder="Preview Image URL" onChange={(e) => {
                        setPreviewImage({ preview: true, url: e.target.value })
                        // e.target.value.length ? setPreviewDisabled(false) : setPreviewDisabled(true)
                    }}
                        value={previewImage.url}
                        required
                    />
                    {questionImage.map((question) => (
                        <input type='text' value={question.url}/>
                    ) )}
                </label> */}
                {errors.product_images && <p className="error-message">{errors.product_images}</p>}
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

// {
//     "id": 23,
//     "userId": 1,
//     "questionBody": "qqqqqqqqqqqqq",
//     "questionImage": [
//         {
//             "id": 20,
//             "questionId": 23,
//             "url": "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*sfOToFJa35tWms48BWzpfg.jpeg",
//             "preview": true,
//             "createdAt": "2025-06-18T20:30:15.532Z",
//             "updatedAt": "2025-06-18T20:30:15.532Z"
//         }
//     ],
//     "author": {
//         "id": 1,
//         "firstName": "Harold",
//         "lastName": "Pedraza",
//         "username": "Demo-lition"
//     },
//     "comments": [],
//     "previewImage": null
// }