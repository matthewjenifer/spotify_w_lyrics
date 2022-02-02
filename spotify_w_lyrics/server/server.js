const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '7bff5a31db354c28802dde5c28b5c1d7',
        clientSecret: '4608c030ef3243d8a0453271fd22ed6e',
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({ 
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)