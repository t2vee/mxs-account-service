const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');

let _model;

const loadModel = async () => {
    if (!_model) {
        console.log('Loading model...');
        if (process.env.PROD) {
            tf.enableProdMode();
        }
        try {
            _model = await nsfw.load(process.env.NSFWJS_MODEL_LINK, {size: 299});
        } catch (err) {
            console.error('Model Failed to load model: ', err);
            return;
        }
        console.log('Model loaded');
    }
    return _model;
};

const getModel = () => {
    if (!_model) {
        console.warn('Model not loaded yet!');
        return null;
    }
    return _model;
};

module.exports = { loadModel, getModel };
