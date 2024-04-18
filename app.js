const express = require('express');
const cors = require('cors');
const identiconRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5173/',
    optionsSuccessStatus: 200
};
app.use(cors());

app.use('/', identiconRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
