// const mongoose = require('mongoose');

// // Connect DB
// mongoose.connect('mongodb://localhost/pcat-test-db', {
//   serverSelectionTimeoutMS: 5000, // 5 saniye
// });

// // Create Schema
// const PhotoSchema = new mongoose.Schema({
//   title: String,
//   description: String,
// });

// const Photo = mongoose.model('Photo', PhotoSchema);

//Veri Yükleme
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Lorem İpsum  2 lorem',
// });
// Promise Kullanarak veri okuma
// Photo.find({})
//   .then((photos) => {
//     console.log(photos);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// Veri Güncelleme
// const id = '67681c2e2901b609a542780b';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 211 updated',
//     description: 'Photo des 211 updated',
//   },
//   {
//     new: true,
//   }
// )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// Veri Silme
// const id = '67681c2e2901b609a542780b';
// Photo.findByIdAndDelete(id)
//   .then((data) => {
//     console.log(data, 'Veri Silindi');
//   })
//   .catch((err) => {
//     console.log(err, 'Veri Silinemedi');
//   });
