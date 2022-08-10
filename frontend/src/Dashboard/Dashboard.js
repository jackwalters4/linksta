import React from 'react';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import Snackbar from '@mui/material/Snackbar';
import './Dashboard.css'

const Dashboard = (props) => {

    const [showCatDeleteMessage, setShowCatDeleteMessage] = useState(false);

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
        (<div className='dashboard-container'>
            {props.categoryMap.map((category, index) => (
                <CategoryCard {...props} catNumber={index + 1} showCatDeleteMessage={showCatDeleteMessage} setShowCatDeleteMessage={setShowCatDeleteMessage} key={index} category={category}/>
            ))}
            <Snackbar
                open={showCatDeleteMessage}
                autoHideDuration={4000}
                onClose={handleDeleteMessageClose}
                message="Category Deleted"
            />
        </div>)

}

export default Dashboard;