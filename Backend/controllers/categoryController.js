const { Mongoose } = require("mongoose");
const Category = require("../models/category");

const getCategories = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }); 
  res.status(200).json(categories);
};

// Create a Category
const createCategory = async (req, res) => {
  const { name } = req.body;

  const image = req.file.filename;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    const category = await Category.create({ name, image });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const updatedData = {
    name: req.body.name,
    image: req.updatedCategory ? req.updatedCategory.image : undefined,
  };

  Category.findByIdAndUpdate(categoryId, updatedData, { new: true })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to update category", details: err })
    );
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(400).json({ message: "Server error", error });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
