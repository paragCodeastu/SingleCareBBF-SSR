const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('drugdetailsapi Called');
  try {
    console.log(req.body)
    const selectedDrug = req.body.selectedDrug;
    const selectedDrugDisplayName = req.body.selectedDrugDisplayName; 

    const baseUrl = 'https://qa.singlecare.com/prescription/';
    const apiUrl = `${baseUrl}${selectedDrug}?q=${selectedDrugDisplayName}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
});

module.exports = router;
