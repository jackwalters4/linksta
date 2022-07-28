import React, { useState } from 'react';
import './AddCatModal.css';
import './AddLinkModal.css';

const AddCatModal = (props) => {

    const [catName, setCatName] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        console.log(catName);

    }

    return (
        <div>
            <form className='category-form-body' onSubmit={handleSubmit}>
                <input placeholder='new category name: ' className='cat-input-text' type="text" value={catName || ""} onChange={event => setCatName(event.target.value)}></input>
                <input className='submit-button' type="submit" value="Add!"></input>
            </form>
        </div>
    )
}

export default AddCatModal;