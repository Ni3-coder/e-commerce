const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controllers/cateogryController") ;
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");
const express = require("express");

const router = express.Router()

// routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController) 

// getAll category
router.get('/get-category', categoryController )

// single category
router.get('/single-category/:slug', singleCategoryController )

// Delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

module.exports = router;