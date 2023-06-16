const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res, next) => {

  try {
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
