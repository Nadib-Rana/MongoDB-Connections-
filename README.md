## 📁 Final File Structure (for  "fruit" project)

```
fruit-app/
│
├── fruit-backend/              # Backend folder (Node.js + Express)
│   ├── models/                 # Mongoose models
│   │   └── users.js
│   ├── index.js                # Main server file
│   ├── seed.js                 # Optional: seed database with sample data
│   └── package.json            # Backend dependencies
│
├── fruit-frontend/             # Frontend folder (React.js)
│   ├── public/
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── index.js            # Entry point
│   │   └── components/         # (Optional) for splitting up UI into components
│   └── package.json            # Frontend dependencies
│
├── .gitignore
└── README.md
```


### ✅ Final Backend Files

---

### 📁 `fruit-backend/index.js`
```js
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
```

---

### 📁 `fruit-backend/models/users.js`
```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
```

---

### ✅ Final Frontend File

---

### 📁 `fruit-frontend/src/App.js`
```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getUsers') // Now matches backend
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
      <div className='w-50 mt-5'>
        <h2 className='mb-3'>User List</h2>
        <table className='table table-bordered'>
          <thead className='thead-dark'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
```

---

## ✅ Run Instructions

1. **Start MongoDB Server**
```bash
mongod
```

2. **Run Backend**
```bash
cd fruit-backend
node index.js
```

3. **Run Frontend**
```bash
cd fruit-frontend
npm start
```

---



## 🧪 Bonus: Add 10 Sample Users data

### 📁 Insile the MongoDB collection (users)

  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 30 },
  { name: "Charlie", email: "charlie@example.com", age: 22 },
  { name: "David", email: "david@example.com", age: 27 },
  { name: "Emma", email: "emma@example.com", age: 31 },
  { name: "Frank", email: "frank@example.com", age: 26 },
  { name: "Grace", email: "grace@example.com", age: 29 },
  { name: "Hannah", email: "hannah@example.com", age: 24 },
  { name: "Ivan", email: "ivan@example.com", age: 28 },
  { name: "Jane", email: "jane@example.com", age: 23 },
];




