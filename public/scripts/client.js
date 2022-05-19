const createTweetElement = (tweet) => {
  return `
    <article class="tweet">
      <header class="tweet__header">
        <div class="tweet__user">
          <img class="tweet__avatar" src=${tweet.user.avatars} alt="user avatar">
          <p>${tweet.user.name}</p>
        </div>
        <div class="tweet__handle">${tweet.user.handle}</div>
      </header>
      <p class="tweet__text">${tweet.content.text}</p>
      <footer class="tweet__footer">
        <time class="tweet__time">${tweet.created_at}</time>
        <div>
          <i class="fa-solid fa-flag tweet__icon"></i>
          <i class="fa-solid fa-retweet tweet__icon"></i>
          <i class="fa-solid fa-heart tweet__icon"></i>
        </div>
      </footer>
    </article>
  `;
};

const renderTweets = (tweets) => {
  tweets.map((tweet) => {
    const $tweetElement = createTweetElement(tweet);
    $('#tweets-container').append($tweetElement);
  });
};

$("#new-tweet__form").submit(function(event) {
  event.preventDefault();

  const text = $(this).serialize();
  $.post("/tweets", text);
});

const loadTweets = () => {
  return $.get("/tweets")
    .then((tweets) => renderTweets(tweets));
};

loadTweets();