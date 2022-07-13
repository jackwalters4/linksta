import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import "./Header.css";

/** Component for the top of the screen
 * Going to have logo to the left, search bar in the middle, plus button on right
 */

const Header = () => {

    const openModal = () => {
        console.log('btn click');
    }

    return (
        <div className='header-container'>
            <h1 className="header-title">Links</h1>
            <IconButton className="add-btn" onClick={openModal}>
                <AddCircle style={{ color: "black" }}/>
            </IconButton>
        </div>
    )
}

export default Header;