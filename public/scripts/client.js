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
        <div class="tweet__icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

renderTweets(data);


$("#new-tweet__form").submit(function(event) {
  event.preventDefault();

  const text = $(this).serialize();
  $.post("/tweets", text);
});
