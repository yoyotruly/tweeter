"use strict";

const simulateDelay = require("./util/simulate-delay");

module.exports = function makeDataHelpers(db) {
  return {

    /** Save tweet to `db` */
    saveTweet: (newTweet, callback) => {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, newTweet);
      });
    },

    /** Get all tweets in `db`, sorted by newest first */
    getTweets: (callback) => {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }

  };
};
