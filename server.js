'use strict';
const express = require('express');
const app = express();
app.use('/static', express.static('.'));
app.get('/api/profile/:name', (req, res) => {
   // Add a fake github api
   // Would be easy to connect it with the real github API.
   res.json({name: req.params.name, repo: 88})
})
app.listen(3000, function () {
  console.log('Sketch app by @pierr!');
});
