const { convert } = require('../lib/imageConverter');
const { getModel } = require('../lib/modelLoader');
const sharp = require('sharp');
const FormData = require('form-data');

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

async function processImage(req, res) {
    if (!req.file) {
        return res.status(400).send("Missing image multipart/form-data");
    }
    try {
        const image = sharp(req.file.buffer);
        const metadata = await image.metadata();
        const minDim = Math.min(metadata.width, metadata.height);
        const left = (metadata.width - minDim) / 2;
        const top = (metadata.height - minDim) / 2;
        const processedImage = await image
            .extract({ left: Math.floor(left), top: Math.floor(top), width: minDim, height: minDim })
            .resize(300, 300, { fit: 'inside' })
            .webp({ quality: 90 })
            .toBuffer();
        const formData = new FormData();
        formData.append('image', processedImage, { filename: 'image.webp', contentType: 'image/webp' });
        res.set('Content-Type', `multipart/form-data; boundary=${formData.getBoundary()}`);
        formData.pipe(res);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(406).send('Failed to process image');
    }
}

module.exports = { classifyImage, processImage };
