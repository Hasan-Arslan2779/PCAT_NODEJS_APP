const Photo = require('../models/Photo');

// About
exports.getAboutPage = (req, res, next) => {
  res.render('about');
};

// Add
exports.getAddPage = (req, res, next) => {
  res.render('add');
};
// Edit
exports.getEditPage = async (req, res, next) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', { photo });
};
