// check for cors type defined in https://expressjs.com/en/resources/middleware/cors.html#configuration-options

function getCorsOriginConfig() {
    const corsAllowedOrigin = process.env.CORS_ALLOWED_ORIGIN;
    if (!corsAllowedOrigin) {
        throw new Error('CORS_ALLOWED_ORIGIN environment variable is not set.');
    }
    try {
        if (corsAllowedOrigin.toLowerCase() === 'true') {
            return true;
        }
        if (corsAllowedOrigin.toLowerCase() === 'false') {
            return false;
        }
        if (corsAllowedOrigin.startsWith('[') && corsAllowedOrigin.endsWith(']')) {
            const arrayConfig = JSON.parse(corsAllowedOrigin);
            return arrayConfig.map(item => {
                if (typeof item === 'string') {
                    return item;
                }
                if (item.startsWith('/') && item.endsWith('/')) {
                    return new RegExp(item.slice(1, -1));
                }
                throw new Error('Invalid array item in CORS_ALLOWED_ORIGIN');
            });
        }
        if (corsAllowedOrigin.startsWith('/') && corsAllowedOrigin.endsWith('/')) {
            return new RegExp(corsAllowedOrigin.slice(1, -1));
        }
        return corsAllowedOrigin;
    } catch (error) {
        throw new Error('Error processing CORS_ALLOWED_ORIGIN: ' + error.message);
    }
}

module.exports = getCorsOriginConfig;
