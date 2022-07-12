import React from 'react';
import { useEffect, useState  } from 'react';

export default function Dashboard() {

    const [categoryMap, setCategoryMap] = useState(null);
    const getRequestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
        'Accept': 'application/json'},
    }

    useEffect (() => {

        async function fetchData() {

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

            setCategoryMap(categories);

        }

        fetchData();

    }, [])

    // need global href, without localhost:3000 at the front

    return categoryMap === null ?
        (<p1>loading ...</p1>) : 
        (<div>
            {categoryMap.map((category, index) => (
                <div key={index}>
                    <h1>{category.category}</h1>
                    <div>
                        {category.links.map((link, i) => (
                            <div>
                            <a key={i} href={link.url}>{link.title}</a>
                            <br></br>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>)

}