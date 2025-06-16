import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { createAQuestionThunk } from '../../store/question';


const CreateQuestion = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        setFormData(event.target.value)

        if(errorMessage) {
            setErrorMessage("");
        }
    }

    const handleSubmit = async (event) => {
    event.preventDefault();

    if(formData.length < 2){
        setErrorMessage("Please enter more than 2 characters in the box");
    } else {
        setErrorMessage("");
        try {
            await dispatch(createAQuestionThunk(
                {
                   questionBody: formData,
                   previewImgUrl: ""
            }))
        } catch (error) {
            console.error(error)
        }
    }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='What do you want to ask or share?' onChange={handleChange} />
            <button type="submit" >Ask a question</button>
        </form>
    </div>
  )
}

export default CreateQuestion