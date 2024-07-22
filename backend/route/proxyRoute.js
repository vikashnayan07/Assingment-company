const express = require("express");
const axios = require("axios");
const router = express.Router();

// Proxy route for handling requests to http.dog
router.get("/proxy/http-dog/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`https://http.dog/${code}`);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
});

module.exports = router;
