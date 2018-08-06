const express = require('express');
const app = express();

//different Http methods: post, get, put, delete, patch
//getting information about some particular record
app.get('/', (req, res) => {
  //arrow function gets called everytime the specific route is visited
  res.send({ init: 'Hello World' });
});

// '/' which route to listen to  eg: '/Home'

const PORT = process.env.PORT || 5000;
app.listen(PORT);
