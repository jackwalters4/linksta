import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import AddModal from '../AddModal/AddModal';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import "./Header.css";

/** Component for the top of the screen
 * Going to have logo to the left, search bar in the middle, plus button on right
 */

const Header = (props) => {

    const [showModal, setShowModal] = useState(false);

    const [showAddLinkMessage, setShowAddLinkMessage] = useState(false);
    const [showAddCatMessage, setShowAddCatMessage] = useState(false);

    useEffect (() => {

        async function fetchData() {
        
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' ,
                'Accept': 'application/json'},
            }
    
            // get all categories for the user (pass down into AddLinkModal.js)
    
            const response = await fetch('http://localhost:8000/categories/user?uid=62ccc3518f2bb12d96456479', requestOptions)
            const parsedResponse = await response.json();

            props.setCategories(parsedResponse);
        
        }

        fetchData();

    }, []);

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    const handleMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowAddLinkMessage(false);
        setShowAddCatMessage(false);
    };
    
    return props.categories === null ? (null) : (
        <div>
            <AddModal {...props} setShowAddCatMessage={setShowAddCatMessage} setShowAddLinkMessage={setShowAddLinkMessage} showModal={showModal} setShowModal={setShowModal}></AddModal>
            <div className='header-container'>
                <h1 className="header-title">Linksta</h1>
                <IconButton 
                    sx={{margin: 3,}} 
                    className="add-btn" 
                    onClick={openModal}>
                    <AddCircle style={{ color: "black" }}/>
                </IconButton>
            </div>
            <Snackbar
                open={showAddLinkMessage}
                autoHideDuration={4000}
                onClose={handleMessageClose}
                message="Link Added"
            />
            <Snackbar
                open={showAddCatMessage}
                autoHideDuration={4000}
                onClose={handleMessageClose}
                message="Category Added"
            />
        </div>
        
    )
}

export default Header;