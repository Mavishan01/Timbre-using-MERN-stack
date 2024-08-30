const path = require('path');
const fs = require('fs');
const Category = require('../models/category');

const updateCategoryImage = (req, res, next) => {
  const categoryId = req.params.id;

  Category.findById(categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      if (category.image) {
        const oldImagePath = path.join(__dirname, `../src/uploads/categories/${category.image}`);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      if (req.file && req.file.filename) {
        category.image = req.file.filename;
        category.save()
          .then(updatedCategory => {
            req.updatedCategory = updatedCategory;
            next(); 
          })
          .catch(err => res.status(500).json({ error: 'Failed to update category', details: err }));
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json({ error: 'Failed to retrieve category', details: err }));
};

module.exports = updateCategoryImage;