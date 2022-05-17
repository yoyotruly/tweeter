$(document).ready(() => {
  $("#new-tweet__text").on("keyup", function() {
    const MAX_LEN = 140;
    const currentLen = $(this).val().length;

    const charCountElem = $(this).parent().children("div").children(".counter");
    charCountElem.val(MAX_LEN - currentLen);
  });
});