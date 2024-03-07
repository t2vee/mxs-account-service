const express = require('express');
const identiconRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.use('/', identiconRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
