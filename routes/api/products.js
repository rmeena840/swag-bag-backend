const getProduct = require('./utility');
const express = require('express');
const router = express.Router();
const fs = require('fs');

// @route  GET api/products
// @desc   GET All items
// @access Public

router.get('/products', (req, res) => {
    getProduct.then((data, error)=>{
        res.json(data);
    });
})

module.exports = router;
