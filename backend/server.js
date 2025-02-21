// Hirelink-backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const externalJobRoutes = require('./routes/externalJobRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['hire-link-1xw4.vercel.app'], // add your Vercel URL here
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/external-jobs', externalJobRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(async() => {
    console.log('Connected to MongoDB Atas!');
    // Run the connectionStatus command to see authenticated user info
    const status = await mongoose.connection.db.command({ connectionStatus: 1 });
    console.log('Authenticated Users:', status.authInfo.authenticatedUsers);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
  const { MongoClient } = require('mongodb');

// Use the same MONGO_URI from your .env
const uri = process.env.MONGO_URI;

// async function updateUserRoles() {
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     const db = client.db("Cluster68484"); // Replace with your database name

//     // Run the command to update user roles
//     const result = await db.command({
//       updateUser: "jobUser", // Replace with your username
//       roles: [{ role: "readWrite", db: "Cluster68484" }] // Replace with your database name
//     });
    
//     console.log("User roles updated:", result);
//   } catch (err) {
//     console.error("Failed to update roles:", err);
//   } finally {
//     await client.close();
//   }
// }

// // Call the function once during server startup
// updateUserRoles();