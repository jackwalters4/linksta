/**
 * Link Bubble is technically a button.  So pass in entire Link object
 */

import "./LinkBubble.css";

const LinkBubble = (props) => {
    return (
        <div className="link-bubble">
            <p className="link-bubble-title">{props.link.title}</p>
        </div>
    )
}

export default LinkBubble;