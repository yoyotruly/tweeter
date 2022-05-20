const convertText = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};

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

const renderTweet = (tweet) => {
  const $tweetElement = createTweetElement(tweet);
  $("#tweets-container").prepend($tweetElement);
};

const loadTweets = async (path) => {
  const tweets = await $.ajax(path, { method: "GET" });

  return tweets.map((tweet) => renderTweet(tweet));
};


loadTweets("/tweets");

$("#new-tweet__form").submit(async function(event) {
  event.preventDefault();

  const text = $(this).serialize();
  const newTweet = await $.post("/tweets", text);
  renderTweet(newTweet);

  $("#new-tweet__form").trigger("reset");
});


// const validateTweet = (tweetText) => {
//   if (tweetText)
// }