const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// routes
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

// PORT listener
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});