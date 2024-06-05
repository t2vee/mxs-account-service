const { convert } = require('../lib/imageConverter');
const { getModel } = require('../lib/modelLoader');

async function classifyImage(req, res) {
    const model = getModel();
    if (!model) {
        return res.status(500).send('Model is not loaded yet');
    }
    if (!req.file) {
        return res.status(400).send("Missing image multipart/form-data");
    }
    try {
        const image = await convert(req.file.buffer, req.file.mimetype);
        const predictions = await model.classify(image);
        image.dispose();
        res.json(predictions);
    } catch (error) {
        console.log('Error processing image', error);
        res.status(406).send('Unsupported Image Type');
    }
}

module.exports = { classifyImage };
