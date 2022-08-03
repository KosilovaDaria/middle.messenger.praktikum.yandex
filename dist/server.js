
const express = require('express');
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static((__dirname)));

app.get("/*", (req, res) => {
	const index = path.join(__dirname, "/index.html");
	res.sendFile(index);
});

app.listen(PORT, function () {
  console.log(`Messege app listening on port ${PORT}!`);
}); 