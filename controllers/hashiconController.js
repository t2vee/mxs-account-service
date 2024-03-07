const { hashicon } = require('@emeraldpay/hashicon');
const { createCanvas } = require('canvas');

/**
 * Generates and sends an identicon image based on the provided hash, using Hashicon.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateHashiconImage = (req, res) => {
    const { hash } = req.params;
    const size = 200; // Specify the size of the identicon

    try {
        // Override the createCanvas function to use the 'canvas' library
        const params = {
            size,
            createCanvas: (width, height) => {
                return createCanvas(width, height);
            }
        };

        // Generate the hashicon
        const icon = hashicon(hash, params);

        // Convert the canvas to a Buffer containing a PNG image
        const buffer = icon.toBuffer('image/png');

        // Set the correct Content-Type for PNG
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate identicon.' });
    }
};
