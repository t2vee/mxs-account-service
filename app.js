require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { loadModel } = require('./lib/modelLoader');
const checkRouter = require('./routes');
const getCorsOriginConfig = require('./lib/getCorsOriginConfig');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: getCorsOriginConfig(),
    optionsSuccessStatus: 200,
    accessControlAllowCredentials: true,
    allowHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
    methods: "GET,OPTIONS,POST",
    maxAge: 86400,
};
app.use(cors(corsOptions));

app.use('/', checkRouter);

loadModel().then(() => {
    app.listen(process.env.PORT || 3005, () => {
        console.log(`Server running on port ${process.env.PORT || 3005}`);
    });
});
