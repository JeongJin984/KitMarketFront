const axios = require("axios");
const jwt_decode = require("jwt-decode");

const setAxiosCookie = (str) => {
  axios.defaults.headers.Cookie = str;
}

module.exports = function(path) {
  return async function setCurrentUser(req, res, next) {
    if(path === req.baseUrl) {
      return next();
    } else {
      var cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if(req && cookie) {
        var token = cookie.slice(20);
        var decoded = jwt_decode(token);
        await setAxiosCookie(cookie);
        if(Date.now() >= decoded.exp*1000) {
          console.log("Expired");
          const result = await axios.get('http://localhost:8083/api/refresh')
          await setAxiosCookie(cookie.substr(0,20)+result.data)
          res.cookie('Authorization', "BEARER"+result.data)
        }
      }
      next();
    }
  };
} 