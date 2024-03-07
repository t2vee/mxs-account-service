const crypto = require('crypto');

/**
 * Generates a hash from the unique string to ensure consistent results for identicon generation.
 * @param {string} input - The unique string provided in the URL.
 * @returns {string} - A SHA256 hash of the input.
 */
function generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Generates multiple unique hashes from a base string.
 * @param {string} baseString - The base string for hash generation.
 * @returns {Array<string>} - An array of unique hashes.
 */
function generateMultipleHashes(baseString) {
    const hashes = [];
    for (let i = 1; i <= 9; i++) {
        const uniqueString = `${baseString}-${i}-${new Date().getTime()}`;
        const hash = generateHash(uniqueString);
        hashes.push(hash);
    }
    return hashes;
}

const createGenNumHandler = () => {
    let counter = 0;
    return (genNum) => {
        if (typeof genNum === 'number') {
            return genNum;
        } else if (genNum === 'r') {
            counter = counter < 4 ? counter + 1 : 1;
            return counter;
        } else {
            throw new Error('Invalid input: genNum must be a number or "r".');
        }
    };
};

// Create a genNum handler instance
const getNextGenNum = createGenNumHandler();

/**
 * Generates 9 identicon URLs from a single input string.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateHashURLs = (req, res) => {
    const { uniqueString } = req.params;
    let { genNum } = req.params; // This will be a string
    const hashes = generateMultipleHashes(uniqueString);

    // Convert genNum to a number if it's numeric, otherwise pass 'r'
    const numericGenNum = isNaN(parseInt(genNum)) ? 'r' : parseInt(genNum);

    const identiconUrls = hashes.map((hash, index) => {
        // Use the handler to get the correct genNum value
        const currentGenNum = getNextGenNum(numericGenNum);
        return {
            id: index + 1,
            imageUrl: `/gen/${currentGenNum}/${hash}`,
        };
    });

    res.json({ identiconUrls });
};