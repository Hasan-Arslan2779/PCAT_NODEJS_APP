const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

// MIDDLEWARES
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'temp/index.html')); // dosya göndermek için resolve yada join kullanılabilir
});

app.listen(port, () => {
  console.log(` Sunucu ${port} portunda başlatıldı`);
});
