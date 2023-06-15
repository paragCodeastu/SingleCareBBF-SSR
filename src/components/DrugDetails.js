import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const Drugdetails = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  // const selectedDrug = searchParams.get('selectedDrug');
  // const selectedDrugDisplayName = searchParams.get('selectedDrugDisplayName');
  const selectedDrug = "neuraptine"
  const selectedDrugDisplayName = "Neuraptine"



  let htmlData;
  const [drugData, setDrugData] = useState(null);
  const fetchDrugData = async () => {
    console.log("mount")
    console.log('fetch data from node')
    // console.log(selectedDrug, selectedDrugDisplayName)
    const response = await axios.post('http://localhost:3005/drugdetailsapi',
      {
        selectedDrug,
        selectedDrugDisplayName,
      }
    );
    const { data } = response;
    htmlData = data
    console.log(htmlData)
    setDrugData(data);

  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchDrugData();
    }

    return () => {
      isMounted = false;
      console.log("unmount");
    };
  }, [selectedDrug]);
  console.log(htmlData)
  return (
    <div>
      <h1>Drug Details</h1>
      <p>Selected Drug: {selectedDrug}</p>
      <p>Selected Drug Display Name: {selectedDrugDisplayName}</p>

      {drugData ? (
        <div>
          <h2>Drug Information</h2>
         <div dangerouslySetInnerHTML={{ __html: drugData }}>
          </div>
        </div>
      ) : (
        <p>Loading drug information...</p>
      )}
    </div>
  );
};

export default Drugdetails;