const { Mongoose } = require("mongoose");
const Color = require("../models/color")

// GET all Brands
const getColors = async (req, res) => {
    const colors = await Color.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
    // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

    res.status(200).json(colors); // sending that as json back to the brows other clients
    // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
};

// Create a Brand
const createColor = async (req, res) => {
    const { name, hex } = req.body;
    console.log(req.body);
    // add doc to db
    try {
      const color = await Color.create({ name, hex });
      res.status(200).json(color);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const updateColor = async (req, res) => {
  const colorId = req.params.id;
  const updateData = req.body;
  
  try{
    const updatedColor = await Color.findByIdAndUpdate(
      colorId,
      updateData,
      {new: true}
    );
  
    if(!updatedColor)
    {
      console.log("Color not found")
      return res.status(404).json({message: 'Color not found'})
    }
    console.log("Color updated successfully")
  
    res.status(200).json({
      message: 'Color updated successfully',
      category: updatedColor
    });
  
  }
  catch(error){
    console.error('Error updating color:', error);
    res.status(400).json({ message: 'Server error', error });
  }
}

const deleteColor = async (req, res) => {
  const colorId = req.params.id;

  try {
    const deletedColor = await Color.findByIdAndDelete(colorId);

    if (!deletedColor) {
      return res.status(404).json({ message: 'Color not found' });
    }

    res.status(200).json({ message: 'Color deleted successfully' });
  } catch (error) {
    console.error('Error deleting color:', error);
    res.status(400).json({ message: 'Server error', error });
  }
};


module.exports = {
    getColors,
    createColor,
    updateColor,
    deleteColor
}