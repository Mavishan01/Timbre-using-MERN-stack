const { Mongoose } = require("mongoose");
const Brand = require("../models/brand")

// GET all Brands
const getBrands = async (req, res) => {
    const brands = await Brand.find({}).sort({ createdAt: -1 }); 
    res.status(200).json(brands); 
};

// Create a Brand
const createBrand = async (req, res) => {
    const { name } = req.body;

    // add doc to db
    try {
      const brand = await Brand.create({ name });
      res.status(200).json(brand);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const updateBrand = async (req, res) => {
  const brandId = req.params.id;
  const updateData = req.body;
  
  try{
    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      updateData,
      {new: true}
    );
  
    if(!updatedBrand)
    {
      console.log("Brand cannot found")
      return res.status(404).json({message: 'Brand cannot found'})
    }
    console.log("Brand updated successfully")
  
    res.status(200).json({
      message: 'Brand updated successfully',
      category: updatedBrand
    });
  
  }
  catch(error){
    console.error('Error updating brand:', error);
    res.status(400).json({ message: 'Server error', error });
  }
}

const deleteBrand = async (req, res) => {
  const brandId = req.params.id;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(400).json({ message: 'Server error', error });
  }
};


module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
}