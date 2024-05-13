const { getNextGenNum, generateMultipleHashes } = require('../lib/hashGenerator');

/**
 * Generates 9 identicon URLs from a single input string.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateHashURLs = (req, res) => {
    const { uniqueString } = req.params;
    let { genNum } = req.params;
    const limit = req.query.limit;
    const offset = req.query.offset;
    const hashes = generateMultipleHashes(uniqueString, limit, offset);
    const numericGenNum = isNaN(parseInt(genNum)) ? 'r' : parseInt(genNum);
    const identiconUrls = hashes.map((hash, index) => {
        const currentGenNum = getNextGenNum(numericGenNum);
        return {
            id: index + 1,
            imageUrl: `/avatar-service/v1/gen/${currentGenNum}/${hash}`,
        };
    });

    res.json({ identiconUrls });
};
