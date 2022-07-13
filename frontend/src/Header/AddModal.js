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
                        <h2 className='form-header'>Choose Ingredients that are out: </h2>
                    </div>
                    <form>
                        
                    </form>
                </div>
            </div>
        ) : null} </>
    );
}

export default AddModal;