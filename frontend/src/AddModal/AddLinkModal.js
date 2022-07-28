import React, { useState } from 'react';
// import { InputLabel, Input, FormHelperText, FormControl } from '@mui/material';
import './AddLinkModal.css';

/**
 * 
 * Need to get all categories, so I can populate the dropdown menu for categories
 * 
 * Make whole wrapper taller - more height
 * 
 */


const AddLinkModal = (props) => {

    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');

    // when button is clicked
    const handleSubmit = async (event) => {

        event.preventDefault();

        // get category id from name for user
        const cat_id = props.categories.filter(cat => cat.name === category)[0]._id;

        const newLink = {
            uid: "62ccc3518f2bb12d96456479",
            category_id: cat_id,
            title: title,
            url: link,
            note: notes
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Accept': 'application/json'},
            body: JSON.stringify(newLink)
        }

        // add new link to categorymap state variable so it shows immediately
        const newCatMap = props.categoryMap.map(cat => {
            if (cat.category === category) {
                const links = cat.links;
                links.push(newLink);
                return {...cat, links: links};
            }
            return cat;
        });

        console.log(newCatMap);

        props.setCategoryMap(newCatMap);

        // close modal
        props.setShowModal(false)

        // Confetti Emoji animation when link is added  

        const response = await fetch('http://localhost:8000/links', requestOptions);
        console.log(response);

        // reset state variables to empty string ??
        // do some eerror handling stuff
    }


    return (
        <div>
            <form className='form-body' onSubmit={handleSubmit}>
                <input placeholder='paste link here:' className='input-text' type="text" value={link || ""} onChange={event => setLink(event.target.value)}></input><br/><br/>
                <div className='side-by-side'>
                    <input placeholder='link title' className='title-input-text' type="text" value={title || ""} onChange={event => setTitle(event.target.value)}></input>
                    <select name="dog-names" id="dog-names" onChange={event => setCategory(event.target.value)}>
                        <option value="rigatoni">Category</option>
                        {props.categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div><br/><br/>
                <textarea placeholder='notes' className='notes-input-text' type="text" value={notes || ""} onChange={event => setNotes(event.target.value)}></textarea>
                <input className='submit-button' type="submit" value="Submit"></input>
            </form>
        </div>
    )

}

export default AddLinkModal;