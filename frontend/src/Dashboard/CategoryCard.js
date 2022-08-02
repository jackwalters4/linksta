import { useState } from 'react';
import LinkBubble from "./LinkBubble";
import Snackbar from '@mui/material/Snackbar';
import "./CategoryCard.css";

/**
 * Need a delete button probably, a hover one would be pretty good i gueses
 */

const CategoryCard = (props) => {

    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const handleDeleteMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowDeleteMessage(false);
    };
    
    return (
        <div className="category-body">
            <h1 className="card-header">{props.category.category.name}</h1>
            <div>
                {props.category.links.map((link, i) => (
                    <LinkBubble catNumber={props.catNumber} showDeleteMessage={showDeleteMessage} setShowDeleteMessage={setShowDeleteMessage} category={props.category} categoryMap={props.categoryMap} setCategoryMap={props.setCategoryMap} key={i} link={link}/>
                ))}
            </div>
            <Snackbar
                open={showDeleteMessage}
                autoHideDuration={4000}
                onClose={handleDeleteMessageClose}
                message="Link Deleted"
            />
        </div>
    );
  }
  
  export default CategoryCard;