import React from 'react';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import Snackbar from '@mui/material/Snackbar';
import { DragDropContext } from 'react-beautiful-dnd';
import './Dashboard.css'

const Dashboard = (props) => {

    const [showCatDeleteMessage, setShowCatDeleteMessage] = useState(false);
    const [openModalId, setOpenModalId] = useState('');

     // update state (in categoryMap) so that the new order of LinkBubbles is saved
     const onDragEnd = (result) => {

        console.log(result);

        // if link is dropped in Droppable area
        if (result.destination) {

            // dropped within same category (changing order of list)
            if (result.destination.droppableId === result.source.droppableId) {
                console.log('dropped within same cat');

                // reorder links of category dependent upon result.source.index and result.destination.index (splice takes it out and puts it back in)
                const newCatMap = props.categoryMap.map(cat => {
                    if (cat.category._id === result.source.droppableId) {
                        const links = Array.from(cat.links);
                        const [reorderedLink] = links.splice(result.source.index, 1);
                        links.splice(result.destination.index, 0, reorderedLink)
                        return {...cat, links: links};
                    }
                    return cat
                });

                props.setCategoryMap(newCatMap);

                // when do I write the new order to the DB and how do I keep track of order in the DB? The world may never know


            } else { // dropped in a different category
                console.log('dropped in diff cat');

                // get the link that was moved
                const movedLink = props.categoryMap.filter(cat => cat.category._id === result.source.droppableId)[0].links.filter(link => link._id === result.draggableId)[0];
                console.log(movedLink);

                // create a new cat map with link removed from source category link array and added in correct index to destination category link array
                const newCatMap = props.categoryMap.map(cat => {
                    if (cat.category._id === result.source.droppableId) {
                        // remove link from source
                        return {...cat, links: cat.links.filter(link => link._id != result.draggableId)};
                    } else if (cat.category._id === result.destination.droppableId) {
                        // add newLink in the correct order to destination
                        const links = Array.from(cat.links);
                        links.splice(result.destination.index, 0, movedLink);
                        return {...cat, links: links};
                    }
                    return cat;
                });

                props.setCategoryMap(newCatMap);

                // when to push link's category update to the DB? I think ideally as user refreshes or leaves page

            }

            
        }

    }

    const onDragStart = (result) => {
        // close modal if modal that is being dragged isnt the modal that is open
        if (result.draggableId !== openModalId) {
            setOpenModalId('');
        }
    }

    useEffect (() => {

        async function fetchData() {

            const getRequestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' ,
                'Accept': 'application/json'},
            }

            // get all of a user's links grouped by category\
            const response = await fetch('http://localhost:8000/links?uid=62ccc3518f2bb12d96456479', getRequestOptions)
            const parsedResponse = await response.json();
            console.log(parsedResponse);

            props.setCategoryMap(parsedResponse);

        }

        fetchData();

    }, [])

    const handleDeleteMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowCatDeleteMessage(false);
    };

    // need global href, without localhost:3000 at the front

    return props.categoryMap === null ?
        (<p>loading ...</p>) : 
        (<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className='dashboard-container'>
                {props.categoryMap.map((category, index) => (
                    <CategoryCard {...props} openModalId={openModalId} setOpenModalId={setOpenModalId} catNumber={index + 1} showCatDeleteMessage={showCatDeleteMessage} setShowCatDeleteMessage={setShowCatDeleteMessage} key={index} category={category}/>
                ))}
                <Snackbar
                    open={showCatDeleteMessage}
                    autoHideDuration={2000}
                    onClose={handleDeleteMessageClose}
                    message="Category Deleted"
                />
            </div>
        </DragDropContext>)

}

export default Dashboard;