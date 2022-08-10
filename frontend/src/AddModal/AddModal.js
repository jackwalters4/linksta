import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddLinkModal from './AddLinkModal';
import AddCatModal from './AddCatModal';
import './AddModal.css';

/**
 * Pass in Categories for users as Props -> can use them in dropdown and when link is added
 * 
 * 
 * Refactored form code into AddLinkModal.js -> add a AddCatModal.js
 * need to pass in setShowModal as props too
 * 
 */


const AddModal = (props) => {

    const [alignment, setAlignment] = useState('link');


    const handleModeChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }

    return (
        <>{props.showModal ? (
            <div className='modal-background'>
                <div className='modal-wrapper'>
                    <div className='modal-header'>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleModeChange}
                        >
                            <ToggleButton value="category">Category</ToggleButton>
                            <ToggleButton value="link">Link</ToggleButton>    
                        </ToggleButtonGroup>
                        <IconButton 
                            sx={{position: 'absolute',
                            right: 0,}} 
                            onClick={() => props.setShowModal(false)} size="large">
                            <Close style={{ color: "black" }}/>
                        </IconButton>
                    </div>
                    {alignment === 'link' ? (
                        <AddLinkModal {...props} />
                    ) : <AddCatModal {...props} />}        
                </div>
            </div>
        ) : null} </>
    );
}

export default AddModal;