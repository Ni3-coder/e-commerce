const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController, getSingleProductController, getProductController, productPhotoController,
        updateProductController, deleteProductController, productFiltersController, productCountController,
        productListController, searchProductController, realetedProductController, productCategoryController,
        braintreeTokenController, braintreePaymentController } = require("../controllers/productController");
const formidable = require("express-formidable");

const router = express.Router();

// routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// get products
router.get('/get-product', getProductController)

// single products
router.get('/get-product/:slug', getSingleProductController)

// get photo
router.get('/product-photo/:pid', productPhotoController)

// delete product
router.delete('/delete-product/:pid', deleteProductController)

// filter product 
router.post('/product-filters', productFiltersController)

// product count
router.get('/product-count', productCountController)

// product per page
router.get('/product-list/:page', productListController)

// search product
router.get('/search/:keyword', searchProductController)

// similar product
router.get('/related-product/:pid/:cid', realetedProductController)

// category wise product
router.get('/product-category/:slug', productCategoryController)

// payment routes
// token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

module.exports = router;