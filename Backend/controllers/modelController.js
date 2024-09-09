const { Mongoose } = require("mongoose");
const Model = require("../models/model")


const getModels = async (req, res) => {
    const models = await Model.find({}).sort({ createdAt: -1 }); 
    res.status(200).json(models); 
};


const createModel = async (req, res) => {
    const { name } = req.body;
    try {
      const model = await Model.create({ name });
      res.status(200).json(model);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const updateModel = async (req, res) => {
  const modelId = req.params.id;
  const updateData = req.body;
  
  try{
    const updatedModel = await Model.findByIdAndUpdate(
      modelId,
      updateData,
      {new: true}
    );
  
    if(!updatedModel)
    {
      console.log("Model cannot found")
      return res.status(404).json({message: 'Model cannot found'})
    }
    console.log("Model updated successfully")
  
    res.status(200).json({
      message: 'Model updated successfully',
      category: updatedModel
    });
  
  }
  catch(error){
    console.error('Error updating model:', error);
    res.status(400).json({ message: 'Server error', error });
  }
}

const deleteModel = async (req, res) => {
  const modelId = req.params.id;

  try {
    const deletedModel = await Model.findByIdAndDelete(modelId);

    if (!deletedModel) {
      return res.status(404).json({ message: 'Model not found' });
    }

    res.status(200).json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.error('Error deleting model:', error);
    res.status(400).json({ message: 'Server error', error });
  }
};


module.exports = {
    getModels,
    createModel,
    updateModel,
    deleteModel
}