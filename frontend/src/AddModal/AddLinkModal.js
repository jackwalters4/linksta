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

    /**
     * Figure out how to make the links work - i dont know what to do with this
     */

    const linkProcessing = (link) => {

        // need to add https:// to the front of urls that don't have it (or http)

        if (link.substring(0,8) !== 'https://' && link.substring(0,7) !== 'http://') {
            return 'https://' + link;
        } else {
            return link;
        }
    }

    // when button is clicked
    const handleSubmit = async (event) => {

        /**
         * Need ID from DB in the state variable categoryMap so call API first and then add to state
         * There's a second long delay (similar to one in AddCatModal) but it shouldn't be too terrible
         */

        event.preventDefault();

        // get category id from name for user
        const cat_id = props.categories.filter(cat => cat.name === category)[0]._id;

        const newLink = {
            uid: "62ccc3518f2bb12d96456479",
            category_id: cat_id,
            title: title,
            url: linkProcessing(link),
            note: notes
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Accept': 'application/json'},
            body: JSON.stringify(newLink)
        }

        const response = await fetch('http://localhost:8000/links', requestOptions);
        const parsedResponse = await response.json();
        console.log(parsedResponse);

        const id = parsedResponse.insertedId;

        const linkWithId = {...newLink, _id: id};

        // add new link to categorymap state variable so it shows immediately
        const newCatMap = props.categoryMap.map(cat => {
            if (cat.category.name === category) {
                const links = cat.links;
                links.push(linkWithId);
                return {...cat, links: links};
            }
            return cat;
        });

        props.setCategoryMap(newCatMap);

        // close modal
        props.setShowModal(false)

        // show link added message
        props.setShowAddLinkMessage(true);

        // Confetti Emoji animation when link is added  
    }


    return (
        <div>
            <form className='form-body' onSubmit={handleSubmit}>
                <input placeholder='paste link here:' className='input-text' type="text" value={link || ""} onChange={event => setLink(event.target.value)}></input><br/><br/>
                <div className='side-by-side'>
                    <input placeholder='link title' className='title-input-text' type="text" value={title || ""} onChange={event => setTitle(event.target.value)}></input>
                    <select className='category-select' onChange={event => setCategory(event.target.value)}>
                        <option value="category">Category</option>
                        {props.categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div><br/><br/>
                <textarea placeholder='notes' className='notes-input-text' type="text" value={notes || ""} onChange={event => setNotes(event.target.value)}></textarea>
                <input className='submit-button' type="submit" value="Add!"></input>
            </form>
        </div>
    )

}

export default AddLinkModal;