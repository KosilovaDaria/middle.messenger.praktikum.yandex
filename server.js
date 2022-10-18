// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.use(express.static((`${__dirname}/dist`)));

// app.get('/*', (req, res) => {
//   const index = path.join(`${__dirname}/dist`, '/index.html');
//   res.sendFile(index);
// });

// app.listen(PORT, () => {
//   console.log(`Messege app listening on port ${PORT}!`);
// });

const express = require('express');
const history = require('express-history-api-fallback');

const app = express();

app.use(express.static('./dist'));
app.use(history('index.html', { root: './dist' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on ", PORT);
});