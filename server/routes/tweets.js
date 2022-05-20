"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes
    .route("/")
    .get((req, res) => {
      DataHelpers.getTweets((err, tweets) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        res.json(tweets);
      });
    })
    .post((req, res) => {
      if (!req.body.text) {
        return res.status(400).json({ error: 'invalid request: no data in POST body'});
      }
  
      const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
      const tweet = {
        user: user,
        content: {
          text: req.body.text
        },
        created_at: Date.now()
      };

      DataHelpers.saveTweet(tweet, (err, data) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        res.status(201).send(data);
      });
    });

  return tweetsRoutes;

};
