import React, { useState } from 'react';
import './AddLinkModal.css';


const AddLinkModal = (props) => {

    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');

    // when button is clicked
    const handleSubmit = async (event) => {

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Accept': 'application/json'},
            body: JSON.stringify({
                uid: "62ccc3518f2bb12d96456479",
                category_id: "ofnweifjwoeifnweoifnweoifn",
                title: title,
                url: link,
                note: notes	})
        }

        // close modal
        props.setShowModal(false)

        // Confetti Emoji animation when link is added  

        const response = await fetch('http://localhost:8000/links', requestOptions);
        console.log(response);

        // reset state variables to empty string ??
        // do some eerror handling stuff
    }


    return (
        <form className='form-body' onSubmit={handleSubmit}>
            <input placeholder='paste link here:' className='input-text' type="text" value={link || ""} onChange={event => setLink(event.target.value)}></input><br/><br/>
            <input placeholder='link title' className='input-text' type="text" value={title || ""} onChange={event => setTitle(event.target.value)}></input><br/><br/>
            <input placeholder='category' className='input-text' type="text" value={category || ""} onChange={event => setCategory(event.target.value)}></input><br/><br/>
            <input className='submit-button' type="submit" value="Submit"></input>
        </form>
    )
}

export default AddLinkModal;