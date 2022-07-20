import React from 'react';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import './AddModal.css';


const AddModal = (props) => {
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
                    <form className='form-body'>
                        <input placeholder='paste link here:' className='input-text' type="text"></input><br/><br/>
                        <input placeholder='link title' className='input-text' type="text"></input><br/><br/>
                        <input placeholder='category' className='input-text' type="text"></input><br/><br/>
                        <input className='submit-button' type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        ) : null} </>
    );
}

export default AddModal;