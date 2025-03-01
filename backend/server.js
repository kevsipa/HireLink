// Hirelink-backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const externalJobRoutes = require('./routes/externalJobRoutes');
const { syncExternalJobs } = require('./controllers/externalJobController');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://hire-link-1xw4.vercel.app'], // add your Vercel URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/external-jobs', externalJobRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    
    // Automatically sync external jobs on startup
    syncExternalJobs()
      .then((jobs) => {
        console.log(`Startup sync: Created ${jobs.length} new job(s).`);
      })
      .catch((error) => {
        console.error('Error during startup sync:', error.message);
      });
      
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Use the same MONGO_URI from your .env
// const uri = process.env.MONGO_URI;

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