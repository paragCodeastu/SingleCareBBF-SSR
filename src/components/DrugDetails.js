import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import '../App.css';

const Drugdetails = ({ apiData }) => {
//   useEffect(() => {
//     fetchDrugData();
//   }, []);

//   const fetchDrugData = async () => {
//     const response = await axios.post(
//       'http://localhost:3005/drugdetailsapi',
//       {
//         selectedDrug,
//         selectedDrugDisplayName
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//   };
// console.log(apiData)
  return (
    <div>
      <h1>Drug Details</h1>
      <p>Selected Drug: {apiData.selectedDrug}</p>
      <p>Selected Drug Display Name: {apiData.selectedDrugDisplayName}</p>
      {apiData ? (
        <div>
          <h2>Drug Information</h2>
          <div dangerouslySetInnerHTML={{ __html: apiData }}></div>
        </div>
      ) : (
        <p>Loading drug information...</p>
      )}
    </div>
  );
};

export default Drugdetails;