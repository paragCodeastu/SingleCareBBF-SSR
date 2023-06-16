
import React from 'react';
import './App.css';
import DrugDetails from './components/DrugDetails';
import Searchbyalphabate from './components/Searchby alphabate';

const App = ({ drugDetailsApiData,searchApiData }) => {
    return (
    <div className="app-container"> 
      <div className='searchdrug-byalphabate'>
          <h3>Print Drug Suggestion List</h3>
            <Searchbyalphabate apiData={searchApiData} />
      </div>
      <div className='drugdetails'>  
          <h3>Print DRUG INFORMATION </h3>  
           <DrugDetails apiData={drugDetailsApiData} />
      </div>          
    </div>
  );
};
export default App;
