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

            /** get each categories name now -> would this be faster on the backend ? IDK */

            // need to wrap this in a Promise.all kind of thing right ?
            const categories = await Promise.all(parsedResponse.map(async (category) => {
                const response = await fetch('http://localhost:8000/categories?id=' + category.category_id, getRequestOptions)
                const cat = await response.json()
                return {
                    category: cat.name,
                    links: category.links
                } 
            }))

            props.setCategoryMap(categories);

        }

        fetchData();

    }, [])

    // need global href, without localhost:3000 at the front

    return props.categoryMap === null ?
        (<p1>loading ...</p1>) : 
        (<div className='dashboard-container'>
            {props.categoryMap.map((category, index) => (
                <CategoryCard categoryMap={props.categoryMap} setCategoryMap={props.setCategoryMap} key={index} category={category}/>
            ))}
        </div>)

}

export default Dashboard;