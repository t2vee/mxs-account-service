const monster = require('../utils/monsterid.min.js');
/**
 * Generates and sends a MonsterId image based on the provided hash.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateMonsterIDImage = (req, res) => {
    const { hash } = req.params;
    const img = monster.getAvatar(hash, 128, 128);
    res.setHeader('Content-Type', 'image/png');
    res.send(img);
};
