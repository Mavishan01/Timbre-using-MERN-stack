const { Mongoose } = require("mongoose");
const Category = require("../models/category")

// GET all Categories
const getCategories = async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
    // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

    res.status(200).json(categories); // sending that as json back to the brows other clients
    // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
};

// Create a Category
const createCategory = async (req, res) => {
    const { name,image } = req.body;

    // add doc to db
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

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const updateData = req.body;

  try{
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      {new: true}
    );

    if(!updatedCategory)
    {
      console.log("Category cannot found")
      return res.status(404).json({message: 'Category cannot found'})
    }
    console.log("Category updated successfully")

    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory
    });

  }
  catch(error){
    console.error('Error updating category:', error);
    res.status(400).json({ message: 'Server error', error });
  }
}

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(400).json({ message: 'Server error', error });
  }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}