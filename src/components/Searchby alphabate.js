import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Searchbyalphabate = ({apiData}) => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:3005/searchapi', {
  //         query: 'ba',
  //         maxResults: 6,
  //       });
  //       // setApiData(response.data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="searc-container">
      <form name="searchForm">
        <div className="inputbox">
          {apiData.results.length > 0 && (
            <ul className="alphasuggestions-list">
              {apiData.results.map((suggestion, index) => (
                <li key={index}>{suggestion.displayName}</li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default Searchbyalphabate;
