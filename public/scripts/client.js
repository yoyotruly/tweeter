/** Convert input to plain text to prevent cross-site scripting.
 * @param {string} str Any text string
 * @returns {string} Plain text (HTML tags won't be interpreted by the browswer)
*/
const convertText = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};

/**
 * Create a complete tweet HTML element.
 * @param {Object} tweet Tweet object containing user info, time and tweet text
 * @returns HTML element of a tweet
 */
const createTweetElement = (tweet) => {
  const avatar = convertText(tweet.user.avatars);
  const name = convertText(tweet.user.name);
  const handle = convertText(tweet.user.handle);
  const text = convertText(tweet.content.text);
  const time = timeago.format(tweet.created_at);

  return `
    <article class="tweet">
      <header class="tweet__header">
        <div class="tweet__user">
          <img class="tweet__avatar" src=${avatar} alt="user avatar">
          <p>${name}</p>
        </div>
        <div class="tweet__handle">${handle}</div>
      </header>
      <p class="tweet__text">${text}</p>
      <footer class="tweet__footer">
        <time class="tweet__time">${time}</time>
        <div>
          <i class="fa-solid fa-flag tweet__icon"></i>
          <i class="fa-solid fa-retweet tweet__icon"></i>
          <i class="fa-solid fa-heart tweet__icon"></i>
        </div>
      </footer>
    </article>
  `;
};

/**
 * Render individual tweet on the very top of the tweets-container.
 * @param {Object} tweet Tweet object containing user info, time and tweet text
 * @returns None
 */
const renderTweet = (tweet) => {
  const $tweetElement = createTweetElement(tweet);
  $("#tweets-container").prepend($tweetElement);
};

/**
 * Fetch and load all tweets from a given path.
 * @param {*} route The route to get all tweets
 * @returns New DOM with all tweets prepended to the tweets-container
 */
const loadTweets = async (route) => {
  const tweets = await $.ajax(route, { method: "GET" });

  return tweets.map((tweet) => renderTweet(tweet));
};

/**
 * Valid if a tweet is empty or exceeds character limit.
 * @param {*} tweetText Tweet text user submitted
 * @returns {string} Appropriate error message
 */
const validateTweet = (tweetText) => {
  if (!tweetText && tweetText !== 0) {
    return "Oops, tweet can't be empty.";
  } else if (tweetText.length > 140) {
    return "Got too much to say? Try break them down into separate tweets.";
  }
};

/* ------ Main Functions ------ */
loadTweets("/tweets");

/* toggle new tweet section */
$("#composer").on("click", function() {
  $("#new-tweet").toggle();
})

/* submit tweet */
$("#new-tweet__form").submit(async function(event) {
  event.preventDefault();
  
  /* on invalid submission, prompt error message and stop progressing further */
  const text = $("#new-tweet__text").val();
  const errorMsg = validateTweet(text);
  if (errorMsg) {
    return $("#new-tweet__error")
      .text(errorMsg)
      .prepend("<i class='fa-solid fa-circle-exclamation'></i> ")
      .animate({ "margin-left": "1.5em" }, 100)  // mimic shake effect
      .animate({ "margin-left": "1em" }, 100)
      .animate({ "margin-left": "1.5em" }, 100)
      .animate({ "margin-left": "1em" }, 100);
  }
  
  /* on successful re-submission, remove any previous error message */
  const errorContent = $("#new-tweet__error").contents();
  if (errorContent) {
    errorContent.remove();
  }

  /* incrementally submit and render new tweet */
  const serializedText = $(this).serialize();
  const newTweet = await $.post("/tweets", serializedText);
  renderTweet(newTweet);

  /* clear input text area and reset counter color after successful submission */
  $(this).trigger("reset");
  $(this).find(".new-tweet__counter").css("color", "inherit");
});