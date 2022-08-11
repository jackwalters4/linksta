import React, { useState, useEffect } from 'react';
import './LinkModal.css';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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

    const [dialogOpen, setDialogOpen] = useState(false);

    const deleteButtonClicked = async () => {
        
        // close dialog, modal and show delete message (component stored in Category Card)
        setDialogOpen(false);
        props.setOpenModalId('');
        props.setShowDeleteMessage(true);
        
        /**
      
        remove link from state array
         
        props.categoryMap looks like this:
         
        [
            {category: {}, links: [{}, {}, ...]},
            {category: {}, links: [{}, {}, ...]}
        ]

         */
        

        const newCatMap = props.categoryMap.map(cat => {
            if (cat.category === props.category.category) {
                return {...cat, links: cat.links.filter(link => link._id != props.link._id)}
            }
            return cat;
        });
        
        props.setCategoryMap(newCatMap);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,
                'Accept': 'application/json'},
        }

        const response = await fetch('http://localhost:8000/links?link_id=' + props.link._id, requestOptions);

        const parsedResponse = await response.json();
        console.log(parsedResponse);
        
    }

    const closeModalClicked = () => {
        props.setOpenModalId('');
    }

    return (<>{props.openModalId === props.link._id ? (
        <div className='link-modal-background'>
            <div className='link-modal-wrapper' style={{'marginLeft': props.catNumber % 3 == 0 && '-90%', 'marginTop': props.catNumber > 3 && '-75%'}}>
                <div className='link-modal-header'>
                    <IconButton className='close-link-modal-button' size="large" onClick={closeModalClicked}>
                        <Close style={{ color: "black" }}/>
                    </IconButton>
                    <h2 className='link-form-header'>{props.link.title}</h2>
                </div>
                <div className='link-modal-body'>
                    <a  className='link-modal-url' href={props.link.url}>{props.link.url.substring(0,25)}</a>
                    <label className='link-notes-label'>Notes:</label>
                    <div className='link-notes-section'>
                        {props.link.note}
                    </div>
                </div>
                <div className='link-modal-footer'>
                    <IconButton size='large'>
                        <EditIcon style={{ color: "black" }}/>
                    </IconButton>
                    <IconButton className='delete-link-button' size='large' onClick={() => setDialogOpen(true)}>
                        <DeleteForeverIcon style={{ color: "black" }}/>
                    </IconButton>
                </div>
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>Are you sure you want to delete {props.link.title}?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={deleteButtonClicked} autoFocus>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>     
    ) : null}</>
    );
}

export default LinkModal;