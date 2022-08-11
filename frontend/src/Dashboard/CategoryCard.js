import { useState } from 'react';
import LinkBubble from "./LinkBubble";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./CategoryCard.css";

/**
 * Need a delete button probably, a hover one would be pretty good i gueses
 */

const CategoryCard = (props) => {

    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [linkOpen, setLinkOpen] = useState(false);

    // hovering state variable for showing the delete category button or not
    // maybe think about hovering for a number of seconds before showing the delete button ? IDK tho
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        if (!linkOpen) {
            setIsHovering(true);
        }
        
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const handleDeleteMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowDeleteMessage(false);
    };
    
    const dialogCancelBtnClicked = () => {
        // close dialog and no longer hovering (takes away delete button)
        setDialogOpen(false);
        setIsHovering(false);
    }

    const deleteCategory = async () => {
        console.log(`delete category ${props.category.category._id}`);

        console.log(props.categories);

        // close dialog, show delete category toast, no longer hovering over CategoryCard
        setDialogOpen(false);
        props.setShowCatDeleteMessage(true);
        setIsHovering(false);

        // remove category from categoryMap state variable
        const newCatMap = props.categoryMap.filter(category => category.category._id != props.category.category._id);
        props.setCategoryMap(newCatMap);

        // remove category from categories state variable (dropdown categories in AddLinkModal uses this)
        const newCats = props.categories.filter(category => category._id != props.category.category._id);
        props.setCategories(newCats);

        // call api to delete categories
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,
                'Accept': 'application/json'},
        }

        const response = await fetch('http://localhost:8000/categories?category_id=' + props.category.category._id, requestOptions);

        const parsedResponse = await response.json();
        console.log(parsedResponse);

    };
    
    return (
        <div className="category-body" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className='category-card-header'>
                <h2 className="card-title">{props.category.category.name}</h2>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Are you sure you want to delete {props.category.category.name}?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete all links under the category as well
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCancelBtnClicked}>Cancel</Button>
                    <Button onClick={deleteCategory} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
            <div>
                    <Droppable droppableId={props.category.category._id} type="LINK">
                        {(provided) => (
                            <ul className='link-bubble-list' {...provided.droppableProps} ref={provided.innerRef}>
                            {props.category.links.map((link, i) => (
                                <Draggable key={link._id} draggableId={link._id} index={i}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <LinkBubble {...props} setLinkOpen={setLinkOpen} isHovering={isHovering} setIsHovering={setIsHovering} showDeleteMessage={showDeleteMessage} setShowDeleteMessage={setShowDeleteMessage} key={i} link={link}/>
                                    </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
            </div>
            <Snackbar
                open={showDeleteMessage}
                autoHideDuration={4000}
                onClose={handleDeleteMessageClose}
                message="Link Deleted"
            />
            <div className='category-body-footer'>
                {isHovering && 
                <IconButton 
                        sx={{margin: 1}}
                        className='delete-category-button' 
                        onClick={() => setDialogOpen(true)}
                        size='small'
                    >
                        <DeleteForeverIcon style={{ color: "black" }}/>
                </IconButton>}
            </div>
            
        </div>
    );
  }
  
  export default CategoryCard;