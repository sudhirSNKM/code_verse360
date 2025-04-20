const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));

// Environment Variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/codeverse360';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  year: { type: String, required: true },
  course: { type: String, required: true },
  institution: { type: String, required: true },
  foodPreference: { type: String, required: true },
  accommodation: { type: String, required: true },
  transactionId: { type: String, required: true },
  upiId: { type: String, required: true },
  selectedEvents: { type: [String], required: true }
});

// Create a model
const Registration = mongoose.model('Registration', registrationSchema);

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to CodeVerse360 Backend!');
});

// Save data endpoint
app.post('/save', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).send('Data saved successfully!');
  } catch (error) {
    res.status(500).send(`Error saving data: ${error.message}`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});