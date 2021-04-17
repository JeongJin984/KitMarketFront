const backURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.webworks.kr'
    : 'http://localhost:8080';
const frontURL =
  process.env.NODE_ENV === 'production'
    ? 'https://webworks.kr'
    : 'http://localhost:3000';
const authURL = 'http://localhost:8083';
module.exports = { backURL, frontURL, authURL };
