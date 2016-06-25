'use strict';
const express = require('express');
const app = express();
app.use('/static', express.static('.'));

app.listen(3000, function () {
  console.log('Sketch app by @pierr!');
});
