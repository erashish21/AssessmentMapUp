# Sorting Server

This Node.js server provides two endpoints (`/process-single` and `/process-concurrent`) for sorting arrays. The server demonstrates both sequential and concurrent processing using Node.js and the Express framework.

## Getting Started

1. **Install Dependencies:**
   Ensure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

   Run the following command to install project dependencies:

   ```bash
   npm install
# The server will be running on http://localhost:8000.
# Endpoints
1. Process Single (Sequential Processing)
Endpoint: POST /process-single
Input Format:  {
  "to_sort": [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
}
Response format:
{
  "sorted_arrays": [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  "time_ms": <time_taken_in_milliseconds>
}

Certainly! Below is the complete Node.js code for your server along with a README file:

server.js (Node.js Server Code)
javascript
Copy code
const express = require('express');
const bodyParser = require('body-parser');
const { performance } = require('perf_hooks');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// Endpoint for sequential processing
app.post('/process-single', (req, res) => {
  const startTime = performance.now();
  const sortedArrays = sortSequentially(req.body.to_sort);
  const timeTaken = performance.now() - startTime;

  res.json({
    sorted_arrays: sortedArrays,
    time_ms: timeTaken,
  });
});

// Endpoint for concurrent processing
app.post('/process-concurrent', (req, res) => {
  const startTime = performance.now();
  const sortedArrays = sortConcurrently(req.body.to_sort);
  const timeTaken = performance.now() - startTime;

  res.json({
    sorted_arrays: sortedArrays,
    time_ms: timeTaken,
  });
});

// Sort arrays sequentially
function sortSequentially(arrays) {
  return arrays.map(arr => [...arr].sort((a, b) => a - b));
}

// Sort arrays concurrently
async function sortConcurrently(arrays) {
  const promises = arrays.map(arr => sortArrayAsync([...arr]));

  return Promise.all(promises);
}

// Helper function to sort an array asynchronously
function sortArrayAsync(arr) {
  return new Promise(resolve => {
    setImmediate(() => {
      resolve([...arr].sort((a, b) => a - b));
    });
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
README.md
markdown
Copy code
# Sorting Server

This Node.js server provides two endpoints (`/process-single` and `/process-concurrent`) for sorting arrays. The server demonstrates both sequential and concurrent processing using Node.js and the Express framework.

## Getting Started

1. **Install Dependencies:**
   Ensure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

   Run the following command to install project dependencies:

   ```bash
   npm install
Run the Server:
Execute the following command to start the server:

bash
Copy code
node server.js
The server will be running on http://localhost:8000.

Endpoints
# 1. Process Single (Sequential Processing)
Endpoint: POST /process-single
Input Format:
json
Copy code
{
  "to_sort": [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
}
Response Format:
json
Copy code
{
  "sorted_arrays": [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  "time_ms": <time_taken_in_milliseconds>
}
# 2. Process Concurrent (Concurrent Processing)
Endpoint: POST /process-concurrent
Input Format:
json
Copy code
{
  "to_sort": [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
}
Response Format:
json
Copy code
{
  "sorted_arrays": [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  "time_ms": <time_taken_in_milliseconds>
}
