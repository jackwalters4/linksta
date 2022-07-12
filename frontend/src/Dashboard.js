import React from 'react';
import { useEffect, useState  } from 'react';

export default function Dashboard() {

    const [categoryMap, setCategoryMap] = useState(null);

    useEffect (() => {

        async function fetchData() {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' ,
                'Accept': 'application/json'},
            }

            const response = await fetch('http://localhost:8000/links?uid=62ccc3518f2bb12d96456479', requestOptions)

            const parsedResponse = await response.json();
            console.log(parsedResponse);

            setCategoryMap(parsedResponse);

        }

        fetchData()


    }, [])

    return categoryMap === null ?
        (<p1>loading ...</p1>) : 
        (<div>
            {categoryMap.map((category, index) => (
                <div key={index}>
                    <h1>{category.category_id}</h1>
                    <div>
                        {category.links.map((link, i) => (
                            <p key={i}>{link.title}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>)

}