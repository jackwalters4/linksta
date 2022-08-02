import React from 'react';
import { useEffect } from 'react';
import CategoryCard from './CategoryCard';
import './Dashboard.css'

const Dashboard = (props) => {

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

    // need global href, without localhost:3000 at the front

    return props.categoryMap === null ?
        (<p>loading ...</p>) : 
        (<div className='dashboard-container'>
            {props.categoryMap.map((category, index) => (
                <CategoryCard catNumber={index + 1} categoryMap={props.categoryMap} setCategoryMap={props.setCategoryMap} key={index} category={category}/>
            ))}
        </div>)

}

export default Dashboard;