const express = require('express');
const app = express();
const { getRandomElement } = require('./utils');
const quotes = require('./data');

// Middleware to parse JSON request bodies (if needed)
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET /api/quotes/random - Returns a random quote
app.get('/api/quotes/random', (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.json({ quote: randomQuote });
});

// GET /api/quotes - Returns all quotes or quotes by a specific person
app.get('/api/quotes', (req, res) => {
  const person = req.query.person;
  if (person) {
    const personQuotes = quotes.filter(quote => quote.person === person);
    res.json({ quotes: personQuotes });
  } else {
    res.json({ quotes: quotes });
  }
});

// POST /api/quotes - Adds a new quote
app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person,
  };

  if (!newQuote.quote || !newQuote.person) {
    return res.status(400).json({ error: 'Both quote and person are required' });
  }

  quotes.push(newQuote);
  res.json({ quote: newQuote });
});

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server on port 4001
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
