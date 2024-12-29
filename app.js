const express = require('express');
const { default: mongoose } = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const port = 3000;

//? Controllers
const photoControllers = require('./controllers/photoControllers');
const pageController = require('./controllers/pageContoller');

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  serverSelectionTimeoutMS: 5000, // 5 saniye
});

//? TEMPLATE ENGINE
app.set('view engine', 'ejs');
//! MIDDLEWARES
app.use(express.static('public'));
// URl DATAYI OKUYOR Verielri Yakalıyor
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//? Routes
// İNDEX
app.get('/', photoControllers.getAllPhotos);
// Fotoğrafların İd'sini yakalama ve photo.ejs yönlendirme
app.get('/photos/:id', photoControllers.getPhoto);
// Verilerin düzenlenmiş Halini gönderme
app.put('/photos/:id', photoControllers.updatePhoto);
// Veriyi Silme
app.delete('/photos/:id', photoControllers.deletePhoto);
// Fotoğraf Yükleme
app.post('/photos', photoControllers.createPhoto);

// ABOUT
app.get('/about', pageController.getAboutPage);
// ADD
app.get('/add', pageController.getAddPage);
//Edit
app.get('/photos/edit/:id', pageController.getEditPage);

/// SUNUCU
app.listen(port, () => {
  console.log(` Sunucu ${port} portunda başlatıldı`);
});
