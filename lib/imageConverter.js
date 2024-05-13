const jpeg = require('jpeg-js');
const png = require('pngjs').PNG;
const tf = require('@tensorflow/tfjs-node');

async function convert(imgBuffer, mimeType) {
    let img;
    switch (mimeType) {
        case 'image/jpeg':
            img = await jpeg.decode(imgBuffer, true);
            break;
        case 'image/png':
            img = await png.sync.read(imgBuffer);
            break;
        default:
            throw new Error('Unsupported image type');
    }

    const numChannels = 3;
    const numPixels = img.width * img.height;
    const values = new Int32Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let c = 0; c < numChannels; ++c) {
            values[i * numChannels + c] = img.data[i * 4 + c];
        }
    }

    return tf.tensor3d(values, [img.height, img.width, numChannels], 'int32');
}

module.exports = { convert };
