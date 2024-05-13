const crypto = require('crypto');

/**
 * Generates a hash from the unique string to ensure consistent results for identicon generation.
 * @param {string} input - The unique string provided in the URL.
 * @returns {string} - A SHA256 hash of the input.
 */
function _generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Generates multiple unique hashes from a base string.
 * @param {string} baseString - The base string for hash generation.
 * @param {number} noHashes - The maximum number of hashes to generate
 * @param {number} hashOffset
 * @returns {Array<string>} - An array of unique hashes.
 */
const generateMultipleHashes = (baseString, noHashes = 8, hashOffset = 0) => {
    const hashes = [];
    for (let i = 1; i <= noHashes; i++) {
        const uniqueString = `${baseString}-${i}-${new Date().getTime()}-${hashOffset}`;
        const hash = _generateHash(uniqueString);
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
const getNextGenNum = createGenNumHandler();

module.exports = { getNextGenNum, generateMultipleHashes };