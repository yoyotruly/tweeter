// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(function() {
  
  const createTweetElement = (tweet) => {

    return `
      <article class="tweet">
        <header>
          <div class="tweet__user">
            <img src=${tweet.user.avatars} alt="avatar">
            <p>${tweet.user.name}</p>
          </div>
          <div class="tweet__handle">${tweet.user.handle}</div>
        </header>
        <p class="tweet__text">${tweet.content.text}</p>
        <footer>
          <time>${tweet.created_at}</time>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  };

  
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').append($tweet);

});





// $("#new-tweet").submit(function(event) {
//   event.preventDefault();

//   const text = $(this).serialize();
//   $.post("/tweets", text)
//     .done(function(data) {
      // const article = `
      // <article class="tweet">
      //   <header>
      //     <div class="tweet__user">
      //       <img src="https://i.imgur.com/nlhLi3I.png" alt="avatar">
      //       <p>Rohna</p>
      //     </div>
      //     <div class="tweet__handle">${res.name}</div>
      //   </header>
      //   <p class="tweet__text">${res.text}</p>
      //   <footer>
      //     <time>10 days ago</time>
      //     <div class="buttons">
      //       <i class="fa-solid fa-flag"></i>
      //       <i class="fa-solid fa-retweet"></i>
      //       <i class="fa-solid fa-heart"></i>
      //     </div>
      //   </footer>
      // </article>
      // `;
// 
//       console.log(data);
//     });
// });
