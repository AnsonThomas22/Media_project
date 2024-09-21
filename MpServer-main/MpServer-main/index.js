const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mediaProjectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Schemas and Models

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Video Schema
const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true }
});

// Category Schema
const CategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true }, // Changed to String
  title: { type: String, required: true },
  videos: [VideoSchema] // Nested videos array
});

// History Schema
const HistorySchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  datetime: { type: Date, default: Date.now }
});

// Define Models
const User = mongoose.model('User', UserSchema);
const Video = mongoose.model('Video', VideoSchema);
const Category = mongoose.model('Category', CategorySchema);
const History = mongoose.model('History', HistorySchema);

// Route to add a new category
app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to fetch categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to delete a category
app.delete('/api/categories/:id', async (req, res) => {
  const id = req.params.id; // No need to convert if using string IDs
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to update a category
app.put('/api/categories/:id', async (req, res) => {
  const id = req.params.id; // No need to convert if using string IDs
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to check if email is already registered
app.get('/api/users/check-email', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to register new user
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to log in a user
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password }); // Use hashed password in production
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to add a new video
app.post('/api/videos', async (req, res) => {
  const newVideo = new Video(req.body);
  try {
    await newVideo.save();
    res.status(201).json({ message: 'Video added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to delete a video
app.delete('/api/videos/:id', async (req, res) => {
  const id = req.params.id; // No need to convert if using string IDs
  try {
    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to get videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to add video to history
app.post('/api/history', async (req, res) => {
  const newHistory = new History(req.body);
  try {
    await newHistory.save();
    res.status(201).json({ message: 'History saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to get history
app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to delete history item
app.delete('/api/history/:id', async (req, res) => {
  const id = req.params.id; // No need to convert if using string IDs
  try {
    await History.findByIdAndDelete(id);
    res.status(200).json({ message: 'History item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
