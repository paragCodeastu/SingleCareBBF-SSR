import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';



const SearchBox = () => {

  const [suggestions, setSuggestions] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const fetchData = async (inputQuery) => {
    try {
      const response = await axios.post('http://localhost:3005/searchapi', {
        query: inputQuery,
        maxResults: 6
      });
      const { data } = response;

      if (data.results && data.results.length > 0) {
        const suggestions = data.results.map(({ displayName, seoName }) => ({
          displayName,
          seoName
        }));
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
      console.error('Error:', error);
    }
  };

  const navigatetoDrug = (selectedDrug, selectedDrugDisplayName) => {
    // navigate(`/drugdetails?selectedDrug=${selectedDrug}&selectedDrugDisplayName=${selectedDrugDisplayName}`);
    console.log('navigate');
  };

  const handleSelectSuggestion = (suggestion) => {
    const selectedDrugDisplayName = suggestion.displayName;
    const selectedDrug = suggestion.seoName;
    navigatetoDrug(selectedDrug, selectedDrugDisplayName);
  };

  const handleInputChange = (event) => {
    const inputQuery = event.target.value;
    setSelectedItemIndex(-1);
    clearTimeout(debounceTimerRef.current);

    if (inputQuery.trim() !== '') {
      debounceTimerRef.current = setTimeout(() => {
        fetchData(inputQuery);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  useEffect((inputQuery) => {
    setSelectedItemIndex(-1);
    clearTimeout(debounceTimerRef.current);

    if (inputQuery.trim() !== '') {
      debounceTimerRef.current = setTimeout(() => {
        fetchData(inputQuery);
      }, 300);
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'Enter' && selectedItemIndex !== -1) {
      event.preventDefault();
      handleSelectSuggestion(suggestions[selectedItemIndex]);
    }
  };

  useEffect(() => {
    if (inputRef.current && selectedItemIndex !== -1) {
      inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    }
  }, [selectedItemIndex]);

  return (
    <div className="searchbox-container">
      <form name="searchForm">
        <div className="inputbox">
          <input
            type="text"
            placeholder="Item Search..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            name="inputbox"
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={index === selectedItemIndex ? 'selected' : ''}
                >
                  {suggestion.displayName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="buttonclass">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
