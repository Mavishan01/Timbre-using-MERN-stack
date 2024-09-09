const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const createUploadMiddleware = require("../middlewear/uploadMiddleware");
const updateCategoryImage = require("../middlewear/updateCategoryImage");
const uploadCategoryImage = createUploadMiddleware("categories", "image");

// Get all models
router.get("/", getCategories);

router.post("/", uploadCategoryImage, createCategory);

//Update
router.put("/update/:id",uploadCategoryImage,updateCategoryImage, updateCategory);

//delete
router.delete("/delete/:id", deleteCategory);

module.exports = router;
