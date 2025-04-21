---

## ✅ **Folder Structure**
```
project/
├── config/
│   └── db.js
├── controllers/
│   └── itemController.js
├── models/
│   └── Item.js
├── routes/
│   └── itemRoutes.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

## ✅ Step-by-Step Setup Guide

---

### 🧱 1. **Create Project Folder & Initialize**
```bash
mkdir mongo-express-api
cd mongo-express-api
npm init -y
```

---

### 📦 2. **Install Required Packages**
```bash
npm install express mongoose dotenv cors body-parser
```

---

### 📁 3. **Create Folder Structure**
```bash
mkdir config controllers models routes
touch server.js .env .gitignore
touch config/db.js
touch controllers/itemController.js
touch models/Item.js
touch routes/itemRoutes.js
```

---

### ✍️ 4. **Add the Code Files**

#### 📌 `.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mydb
```

---

#### 📌 `.gitignore`
```gitignore
node_modules/
.env
```

---

#### 📌 `config/db.js`
```js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

#### 📌 `models/Item.js`
```js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
```

---

#### 📌 `controllers/itemController.js`
```js
const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

#### 📌 `routes/itemRoutes.js`
```js
const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
```

---

#### 📌 `server.js`
```js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/items', itemRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

### ▶️ 5. **Run the Project**
```bash
node server.js
```

If you want to auto-restart on changes during development, install **nodemon**:
```bash
npm install --save-dev nodemon
```

Add this to your `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Then run:
```bash
npm run dev
```

---

Let me know if you want this integrated with a React frontend, Dockerized, or hosted on Railway/Render!
