const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, resp, next) => {
  try {
    const query = req.body.query;
    const maxResults = req.body.maxResults;
    const response = await axios.post(
      'https://api.qaapi2.singlecare.com/druginformation/v2/searchdrugs',
      {
        query: query,
        maxResults: maxResults
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    resp.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;