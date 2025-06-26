const auth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = 'your-secret-api-key'; // Replace with your actual  API key

    if (apiKey && apiKey === validApiKey) {
        next(); // API key is valid, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
};

module.exports = auth;
