import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import './AddModal.css';

/**
 * Pass in Categories for users as Props -> can use them in dropdown and when link is added
 */


const AddModal = (props) => {

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

        props.setShowModal(false)

        const response = await fetch('http://localhost:8000/links', requestOptions);
        console.log(response);
    }



    return (
        <>{props.showModal ? (
            <div className='modal-background'>
                <div className='modal-wrapper'>
                    <div className='modal-header'>
                        <IconButton className='close-modal-button' onClick={() => props.setShowModal(false)} size="large">
                            <Close style={{ color: "black" }}/>
                        </IconButton>
                        <h2 className='form-header'>Add Link: </h2>
                    </div>
                    <form className='form-body' onSubmit={handleSubmit}>
                        <input placeholder='paste link here:' className='input-text' type="text" value={link || ""} onChange={event => setLink(event.target.value)}></input><br/><br/>
                        <input placeholder='link title' className='input-text' type="text" value={title || ""} onChange={event => setTitle(event.target.value)}></input><br/><br/>
                        <input placeholder='category' className='input-text' type="text" value={category || ""} onChange={event => setCategory(event.target.value)}></input><br/><br/>
                        <input className='submit-button' type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        ) : null} </>
    );
}

export default AddModal;