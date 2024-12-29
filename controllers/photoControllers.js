const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path'); // path modülünü kullanın
const mongoose = require('mongoose');

// Tüm Fotoğrafları Al
exports.getAllPhotos = async (req, res) => {
  // res.sendFile(path.join(__dirname, 'temp/index.html')); // dosya göndermek için resolve yada join kullanılabilir
  //
  //
  const page = req.query.page || 1;
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

// Fotoğrafları Alma
exports.getPhoto = async (req, res, next) => {
  // ID doğrulama
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid photo ID');
  }

  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send('Photo not found');
    }
    // Fotoğraf URL'sini düzeltme (eğer yol eksikse)

    res.render('photo', { photo });
  } catch (err) {
    console.error('Error fetching photo:', err);
    next(err);
  }
};

// Fotoğraf Yükleme
exports.createPhoto = async (req, res, next) => {
  // Uploads klasörünün tam yolu
  const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

  // Klasör yoksa oluştur
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Yüklenen dosyayı kontrol et
  if (!req.files || !req.files.image) {
    return res.status(400).send('No files were uploaded.');
  }

  // Dosya bilgisi ve yolunu oluştur
  let uploadeImage = req.files.image;
  let uploadPath = path.join(uploadDir, uploadeImage.name);

  // Dosyayı hedef konuma taşı
  uploadeImage.mv(uploadPath, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).send(err);
    }

    // Veritabanına kaydet
    await Photo.create({
      ...req.body,
      image: 'uploads/' + uploadeImage.name, // Veritabanında 'uploads/' yolu ile saklanacak
    });

    // İşlem başarılıysa yönlendir
    res.redirect('/');
  });
};

// Update Photo
exports.updatePhoto = async (req, res, next) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

// Delete Photo
exports.deletePhoto = async (req, res, next) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = path.join(__dirname, '..', 'public', photo.image);

  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
