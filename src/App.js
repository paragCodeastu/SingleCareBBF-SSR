
import React from 'react';
import './App.css';
import DrugDetails from './components/DrugDetails';
import SearchBox from './components/SearchBox';
// import { BrowserRouter as Router, Route,Routes,Link } from 'react-router-dom';
import Searchbyalphabate from './components/Searchby alphabate';

const App = () => {
  return (
    <div className="app-container">
      <div className='searchdrug-byalphabate'>
          <h3>Print Drug Suggestion List</h3>
              <Searchbyalphabate />
              {/* <SearchBox /> */}
      </div>
      <div className='drugdetails'>  
            <h3>Print DRUG INFORMATION </h3>
          <DrugDetails />
      </div>          
    </div>
  );
};

export default App;

















  {/* <Link to='/'>Isha</Link> */}
      {/* <Link to="/drugdetails"></Link> */}
      {/* <Routes> */}
        {/* <Route path="/" element={<SearchBox />} /> */}
        {/* <Route path="/drugdetails" element={<DrugDetails />} /> */}
      {/* </Routes> */}
