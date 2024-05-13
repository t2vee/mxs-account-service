const monster = require('../utils/monsterid.min.js');
const DEFAULT_SIZE = 128;
/**
 * Generates and sends a MonsterId image based on the provided hash.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateMonsterIDImage = (req, res) => {
    let width = DEFAULT_SIZE;
    let height = DEFAULT_SIZE;

    if (req.query.size) {
        width = req.query.size;
        height = req.query.size;
    }
    if (req.query.width) {
        width = req.query.width;
    }
    if (req.query.height) {
        height = req.query.height;
    }
    const img = monster.getAvatar(req.params.name, width, height);
    res.setHeader('Content-Type', 'image/png');
    res.send(img);
};
