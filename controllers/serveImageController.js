const axios = require('axios');
const sharp = require('sharp');

exports.serveImageController = async (req, res) => {
    try {
        const imagePath = req.query.uri;
        const width = parseInt(req.query.w, 10) || null;
        const height = parseInt(req.query.h, 10) || null;

        if (!imagePath) {
            return res.status(400).send('Image path is required');
        }
        const imageUrl = `${process.env.OBJECT_STORAGE_URI}${imagePath}`;
        const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'arraybuffer'
        });
        let image = sharp(response.data);
        if (width || height) {
            image = image.resize(width, height);
        }
        const modifiedImageBuffer = await image.toBuffer();
        res.setHeader('Content-Type', 'image/webp');
        res.send(modifiedImageBuffer);
    } catch (error) {
        console.error('Error fetching or processing the image:', error);
        res.status(500).send('Failed to retrieve or process the image');
    }
}