const axios = require("axios");
const jwt_decode = require("jwt-decode");

const setAxiosCookie = (str) => {
  axios.defaults.headers.Cookie = str;
}

module.exports = function(path) {
  return async function setCurrentUser(req, res, next) {
    var isEvery = path.some(item => 
        (req.originalUrl === item) ||
        req.originalUrl.includes("image") ||
        req.originalUrl.includes("css") ||
        req.originalUrl.includes("next")
      );

    if(isEvery) {
      return next();
    } else {
      var cookies = req ? req.cookies : '';
      axios.defaults.headers.Cookie = '';
      if(req && cookies) {
        var accessToken = cookies["Authorization"].slice(6);
        var accessTokenDecoded = jwt_decode(accessToken);

        var refreshToken = cookies["Refresh"].slice(6);
        var refreshTokenDecoded = jwt_decode(refreshToken);
        await setAxiosCookie(req.headers.cookie);

        console.log("refresh:::", refreshTokenDecoded)
        console.log(Date.now())

        if(Date.now() >= refreshTokenDecoded.exp*1000) {
          console.log("EXPIRED!!!!")
          res.redirect("/login");
        } else if(Date.now() >= accessTokenDecoded.exp*1000) {
          console.log("Expired");
          const result = await axios.get('http://localhost:8083/api/refresh')
          console.log("Result:::::", result)
          cookies["Authorization"] = "BEARER" + result.data

          await setAxiosCookie(cookies);

          res.cookie('Authorization', cookies["Authorization"])
          res.cookie('Refresh', cookies["Refresh"])
        }
      }
      next();
    }
  };
} 