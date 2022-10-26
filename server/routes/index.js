const express = require('express');
const router = express.Router();
const { generateRandomString } = require('../utils/randomString');
const querystring = require("querystring");

// Homepage
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


var client_id = '89e77b4690024094929f9be09292347a';
var redirect_uri = 'http://localhost:3001/callback';

router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

module.exports = router;