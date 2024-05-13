const jdenticon = require('jdenticon');

/**
 * Generates and sends an identicon image based on the provided hash.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateIdenticonImage = (req, res) => {
    const { hash } = req.params;
    const size = 128;

    try {
        const svg = jdenticon.toSvg(hash, size);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate identicon.' });
    }
};
