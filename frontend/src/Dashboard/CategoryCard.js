import LinkBubble from "./LinkBubble";
import "./CategoryCard.css";

/**
 * Need a delete button probably, a hover one would be pretty good i gueses
 */

const CategoryCard = (props) => {
    return (
        <div className="category-body">
            <h1 className="card-header">{props.category.category.name}</h1>
            <div>
                {props.category.links.map((link, i) => (
                    <LinkBubble category={props.category} categoryMap={props.categoryMap} setCategoryMap={props.setCategoryMap} key={i} link={link}/>
                ))}
            </div>
        </div>
    );
  }
  
  export default CategoryCard;