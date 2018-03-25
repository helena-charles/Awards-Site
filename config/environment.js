const env = process.env.NODE_ENV || 'dev';
const secret = process.env.SECRET || 'si3l5sV6BG';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/awards-${env}`;
const port = process.env.PORT || 4000;

module.exports = {dbURI, port, secret, env};
