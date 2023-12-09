const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

//End point for sortSequentially

app.post('/process-single', (req, res) => {
    const startTime =  performance.now();
    const sortedArrays = sortSequentially(req.body.to_sort);
    const timeTaken = performance.now() - startTime;

    res.json({
        sortedArrays: sortedArrays,
        time_ms: timeTaken,
    });

});

//Endpoint processing sortConcurrently
app.post("/process-concurrent", (req, res) => {
  const startTime = performance.now();
  const sortedArrays = sortConcurrently(req.body.to_sort);
  const timeTaken = performance.now() - startTime;

  res.json({
    sorted_arrays: sortedArrays,
    time_ms: timeTaken,
  });
});

//sort arrays seq
function sortSequentially(arrays) {
    return arrays.map(arr => [...arr].sort((a, b) => a - b));
}


//sort arrays concurrent
function sortConcurrently(arrays) {
    const promises = arrays.map(arr => sortArrAsync([...arr]));

    return Promise.all(promises);
}


//Helper function

function sortArrAsync(arr) {
    return new Promise(resolve => {
        setImmediate(() => {
            resolve([...arr].sort((a, b) => a - b));
        });
    });
}


//server start on port 8000
app.listen(PORT, () => {
    console.log(`Server is ruuning on http://localhost:${PORT}`)
})