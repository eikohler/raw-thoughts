const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { generateRandomString } = require('../utils/randomString');
const querystring = require("querystring");
require('dotenv').config();

// Homepage
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

const client_id = '89e77b4690024094929f9be09292347a';
const redirect_uri = 'http://localhost:3001/callback';

// Get User to Authorize Access to Spotify Account
router.get('/login', function(req, res) {
  
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// Retrieve User Access Token from spotify
router.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    let authOptions = { code: code, redirect_uri: redirect_uri, grant_type: "authorization_code" }

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      body: querystring.stringify(authOptions),
    }).then((response) => response.json())
    .then((data) => console.log(data));
  }
});

module.exports = router;