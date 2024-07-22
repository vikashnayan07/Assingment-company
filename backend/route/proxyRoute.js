const express = require("express");
const axios = require("axios");
const router = express.Router();

// List of valid HTTP status codes supported by http.dog
const validStatusCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
  407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423,
  424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507,
  508, 510, 511,
];

// Proxy route for handling requests to http.dog
router.get("/proxy/http-dog/:code", async (req, res) => {
  const { code } = req.params;
  if (!validStatusCodes.includes(parseInt(code))) {
    return res.status(404).send("Not Found");
  }
  try {
    const response = await axios.get(`https://http.dog/${code}.jpg`);
    res.json({ url: response.request.res.responseUrl, code });
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
});

module.exports = router;
