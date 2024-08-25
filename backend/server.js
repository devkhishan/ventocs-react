// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./authenticate');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());


app.post('/api/authenticate', authenticate);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
