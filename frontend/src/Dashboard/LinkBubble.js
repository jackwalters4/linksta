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

// 
import { useState } from 'react';
import LinkModal from './LinkModal';
import "./LinkBubble.css";

const LinkBubble = (props) => {

    const [showLinkModal, setShowLinkModal] = useState(false);

    const linkClicked = () => {

        setShowLinkModal(prev => !prev);

        // open some modal with the link title up top, the link url, and the link notes
    }

    return (
        <div>
            <LinkModal catNumber={props.catNumber} showDeleteMessage={props.showDeleteMessage} setShowDeleteMessage={props.setShowDeleteMessage} category={props.category} categoryMap={props.categoryMap} setCategoryMap={props.setCategoryMap} showLinkModal={showLinkModal} setShowLinkModal={setShowLinkModal}link={props.link}/>
            <button onClick={linkClicked} className="link-bubble">{props.link.title}</button>
        </div>
        
    )
}

export default LinkBubble;