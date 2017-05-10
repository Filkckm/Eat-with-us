var express = require('express');
var router = express.Router();

const User = require('../models/product');
const Review = require('../models/review');

router.get('/products/:productId/reviews/new', (req, res, next) => {
  let productId = req.params.productId;
  Product.findById(productId, (err, product) => {
    if (err) { next(err); }
    res.render('product-review/new', { product: product });
  });
});

router.post('/products/:productId/reviews', (req, res, next) => {
  let productId = req.params.productId;
  Product.findById(productId, (err, product) => {
    const newReview = new Review({
      content: req.body.content,
      stars: req.body.stars,
      author: req.body.author
    });

    product.reviews.push(newReview);

    product.save((err) => {
      res.redirect(`/products/${product._id}`);
    });
  });
});
module.exports = router;
