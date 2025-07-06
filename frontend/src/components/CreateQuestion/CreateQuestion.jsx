import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAQuestionThunk } from '../../store/question';
import './CreateQuestion.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllCategoriesThunk } from '../../store/category';


const CreateQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        questionBody: '',
        previewImgUrl: '',
        categoryId: null
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const categories = useSelector(state => state.categories.allCategories);
    console.log(categories, "categoires in create question")


    const handleFormChange = (event) => {
        // setFormData(event.target.value)
        setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }))

        if (errorMessage) {
            setErrorMessage("");
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.length < 2) {
            setErrorMessage("Please enter more than 2 characters in the box");
        } else {
            setErrorMessage("");
            try {
                await dispatch(createAQuestionThunk(
                    formData
                ))

            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <div id="create-question-items">
            <form onSubmit={handleSubmit}>
                <input id="input-box" type="text" name='questionBody' placeholder='What do you want to ask or share?' onChange={handleFormChange} />
                <input type="text" name='previewImgUrl' placeholder='https://miro.medium.com/v2/resize:fit:4800/format:webp/1*sfOToFJa35tWms48BWzpfg.jpeg' onChange={handleFormChange} />

                <div>
                    <label htmlFor="my-dropdown">Choose an option:</label>
                    <select id="my-dropdown" name='categoryId' value={formData.categoryId} onChange={handleFormChange}>
                        <option value="" disabled>--Select a Category--</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.category}</option>
                        ))}
                    </select>
                    {/* {selectedValue && <p>You selected: {selectedValue}</p>} */}
                </div>
                <button type="submit" >Ask a question</button>

            </form>


        </div>
    )
}

export default CreateQuestion;