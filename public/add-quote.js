// add-quote.js

document.getElementById('submit-quote').addEventListener('click', async () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  if (!quote || !person) {
    alert('Please enter both a quote and a person.');
    return;
  }

  try {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quote, person }),
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById('new-quote').innerText = `New Quote Added: "${result.quote.quote}" - ${result.quote.person}`;
    } else {
      document.getElementById('new-quote').innerText = `Error: ${result.error}`;
    }
  } catch (error) {
    document.getElementById('new-quote').innerText = `Error: ${error.message}`;
  }
});
