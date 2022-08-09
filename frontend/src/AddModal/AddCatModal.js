import React, { useState } from 'react';
import './AddCatModal.css';
import './AddLinkModal.css';

const AddCatModal = (props) => {

    const [catName, setCatName] = useState('');

    const handleSubmit = async (event) => {

        // close modal
        props.setShowModal(false);
        props.setShowAddCatMessage(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Accept': 'application/json'},
            body: JSON.stringify({
                name: catName,
                uid: '62ccc3518f2bb12d96456479'
            })
        }

        const response = await fetch('http://localhost:8000/categories', requestOptions)
        const parsedResponse = await response.json();
        console.log(parsedResponse);

        const id = parsedResponse.insertedId;

        // add new Category to categoryMap state variable
        const newCatMap = [...props.categoryMap]
        const newCat = {
            name: catName,
             _id: id, 
             uid: '62ccc3518f2bb12d96456479'
        }
        newCatMap.push({
            category: newCat,
            links:[]
        });

        props.setCategoryMap(newCatMap);

        // add new Category to category state variable (for category dropdown selection in AddLinkModal)
        const newCategories = [...props.categories];
        newCategories.push(newCat);

        props.setCategories(newCategories);

        /**
         * Theres a second long delay with updating the UI because we wait for the insertedId, I think it's fine for right
         * now but just something to keep an eye on in the futuree if becomes too slow
         */


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