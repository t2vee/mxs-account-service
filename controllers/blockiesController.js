const { createCanvas } = require('canvas');
const blockies = require('../utils/blockies.min');

const DEFAULT_SIZE = 8;
const DEFAULT_SCALE = 16;

/**
 * Generates and sends a Blockies identicon image based on the provided seed.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateBlockiesImage = (req, res) => {
    let size = DEFAULT_SIZE;
    let scale = DEFAULT_SCALE;

    if (req.query.size) {
        size = parseInt(req.query.size, 10);
    }
    if (req.query.scale) {
        scale = parseInt(req.query.scale, 10);
    }

    // Create options for Blockies
    const options = {
        seed: req.params.name, // Use the provided name as the seed
        size: size,
        scale: scale,
        color: req.query.color || undefined, // Optional: specify the icon color
        bgcolor: req.query.bgcolor || undefined, // Optional: background color
        spotcolor: req.query.spotcolor || undefined // Optional: spot color
    };

    // Generate the Blockies identicon
    const iconCanvas = blockies.create(options);

    // Convert the Blockies canvas to a PNG buffer
    const pngBuffer = iconCanvas.toBuffer();

    // Set the Content-Type and send the image
    res.setHeader('Content-Type', 'image/png');
    res.send(pngBuffer);
};
