import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import AddModal from './AddModal';
import { useState } from 'react';
import "./Header.css";

/** Component for the top of the screen
 * Going to have logo to the left, search bar in the middle, plus button on right
 */


/**
    Modal showing at top of the header container right now instead of overlapping the entire screen, need to figure out how to fix
    There was a youtube video in docs showing how to make modal so maybe that's the place to start
 */

const Header = () => {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    return (
        <div>
            <AddModal showModal={showModal} setShowModal={setShowModal}></AddModal>
            <div className='header-container'>
                <h1 className="header-title">Links</h1>
                <IconButton className="add-btn" onClick={openModal}>
                    <AddCircle style={{ color: "black" }}/>
                </IconButton>
            </div>
        </div>
        
    )
}

export default Header;