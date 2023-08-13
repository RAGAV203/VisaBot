
const express = require('express');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Handle GET requests to the homepage
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chatbot', (req, res) => {
  res.render('chatme');
});

// Handle POST requests to the chat endpoint
app.post('/chatbot', async (req, res) => {
  try {
    // Parse the user's message from the request body
    const {message} = req.body;

    // Fetch responses from the JSON API
    const response = await fetch('api-url', {
      method: 'POST',
      body: JSON.stringify({message}),
      headers: { 'Content-Type': 'application/json' },
    });

    // Parse the JSON response
    const json = await response.json();

    // Render the chatbot's response
    res.json(json);
    console.log(json);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});



