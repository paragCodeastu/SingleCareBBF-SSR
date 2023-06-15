import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Searchbyalphabate = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3005/searchapi', {
          query: 'ba',
          maxResults: 6
        });
        const { data } = response;
        if (data.results && data.results.length > 0) {
          const suggestions = data.results.map(({ displayName, seoName }) => {
            if (seoName) {
              console.log('SEO Name:', seoName);
            }
            return {
              displayName,
              seoName
            };
          });
          setSuggestions(suggestions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        setSuggestions([]);
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="searc-container">
      <form name="searchForm">
        <div className="inputbox">
          {suggestions.length > 0 && (
            <ul className="alphasuggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={index === selectedItemIndex ? 'selected' : ''}
                >
                
                  {suggestion.displayName}
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default Searchbyalphabate;
