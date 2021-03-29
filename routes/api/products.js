const express = require('express');
const router = express.Router();
const fs = require('fs');

// @route  GET api/products
// @desc   GET All items
// @access Public

router.get('/products', (req, res) => {
    const dataPath = "/products.json";
    fs.readFile(__dirname + dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data));
      });
})

module.exports = router;
