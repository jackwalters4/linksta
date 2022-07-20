import React from 'react';
import './LinkModal.css';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

/**
 * What pops up when LinkBubble is clicked
 * 
 * Need an edit button too eventually
 * 
 * Should there be a way to open a full page vieew of the link??? (for notes purposes)
 * 
 * Need a way to ensure there is only one LinkModal open at a time, so clicking on a new link bubble closes the preeviously open Linkmodal
 */

const LinkModal = (props) => {
    return (<>{props.showLinkModal ? (
        <div className='link-modal-background'>
            <div className='link-modal-wrapper'>
                <div className='link-modal-header'>
                    <IconButton className='close-link-modal-button' onClick={() => props.setShowLinkModal(false)} size="large">
                        <Close style={{ color: "black" }}/>
                    </IconButton>
                    <h2 className='link-form-header'>{props.link.title}</h2>
                </div>
                <div className='link-modal-body'>
                    <a  className='link-modal-url' href={'//' + props.link.url}>{props.link.url}</a>
                </div>
            </div>
        </div>
    ) : null}</>
    );
}

export default LinkModal;