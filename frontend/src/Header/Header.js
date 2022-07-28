import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import AddModal from '../AddModal/AddModal';
import { useState, useEffect } from 'react';
import "./Header.css";

/** Component for the top of the screen
 * Going to have logo to the left, search bar in the middle, plus button on right
 */

const Header = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState(null);

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

            setCategories(parsedResponse);
        
        }

        fetchData();

    }, []);

    const openModal = () => {
        setShowModal(prev => !prev);
    }
    

    return categories === null ? (null) : (
        <div>
            <AddModal categoryMap={props.categoryMap} setCategoryMap={props.setCategoryMap} categories={categories} showModal={showModal} setShowModal={setShowModal}></AddModal>
            <div className='header-container'>
                <h1 className="header-title">Links</h1>
                <IconButton 
                    sx={{margin: 3,}} 
                    className="add-btn" 
                    onClick={openModal}>
                    <AddCircle style={{ color: "black" }}/>
                </IconButton>
            </div>
        </div>
        
    )
}

export default Header;