const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static((`${__dirname}/dist`)));

app.get('/*', (req, res) => {
  const index = path.join(`${__dirname}/dist`, '/index.html');
  res.sendFile(index);
});

app.listen(PORT, () => {
  console.log(`Messege app listening on port ${PORT}!`);
});
