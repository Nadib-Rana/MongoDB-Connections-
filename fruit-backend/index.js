const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB local connection (corrected "fruit")
mongoose.connect("mongodb://localhost:27017/fruit");

// Get users route (fixed endpoint)
app.get('/getUsers', (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.listen(5000, () => {
  console.log("Server is connected on http://localhost:5000");
});
