require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { loadModel } = require('./lib/modelLoader');
const avatarServiceRouter = require('./routes');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGIN,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/', avatarServiceRouter);

loadModel().then(() => {
    app.listen(process.env.PORT || 3005, () => {
        console.log(`Server running on port ${process.env.PORT || 3005}`);
    });
});
