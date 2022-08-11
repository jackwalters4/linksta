/**
 * Props -> Link
 * link.title, link.url, link.note
 * 
 * 
 * Click on actual title of Link => Take to the website
 * Click on button of Link => Pop up small modal with the link title up top, the link url, and the link notes
 * Try to figuree out technical ddifference between these two ^^
 * 
 * 
 * Is there a better place to put LinkModal ? Are we rendering it for each LinkBubble created now ?
 */


import LinkModal from './LinkModal';
import "./LinkBubble.css";

const LinkBubble = (props) => {

    const bubbleClicked = () => {
        // setShowLinkModal(prev => !prev);
        props.setOpenModalId(props.link._id);
        props.setLinkOpen(true);
        props.setIsHovering(false);
    }

    return (
        <div>
            <LinkModal {...props} />
            <button onClick={bubbleClicked} className="link-bubble">{props.link.title}</button>
        </div>
        
    )
}

export default LinkBubble;