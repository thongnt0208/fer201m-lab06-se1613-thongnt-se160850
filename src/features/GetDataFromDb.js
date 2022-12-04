import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshData } from './Store';

//this function to get data from DB then save in redux store
export default function GetDataFromDb() {
    
    // const [APIData, setAPIData] = useState([]);
    const dispatch = useDispatch();

    const baseURL = `https://6336fae365d1e8ef2677835f.mockapi.io/users`;
    useEffect(() => {
        fetch(baseURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                // setAPIData(data);
                dispatch(refreshData(data));
            })
            .catch(error => console.log(`Heloooo ${error.message}`));
    }, []);
    //console.log(APIData);
    return (
        <>
            {/* {APIData.map((data) => {
                return (
                    <div>
                        <h1>{data.name}</h1>
                    </div>
                )
            })} */}
        </>
    )

}