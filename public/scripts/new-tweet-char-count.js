$(document).ready(() => {
  $("#new-tweet__text").on("keyup", function() {
    const MAX_LEN = 140;
    const currentLen = $(this).val().length;
    const remainingLen = MAX_LEN - currentLen;

    const charCountElem = $(this).parent().find(".counter");
    charCountElem.val(remainingLen);

    if (remainingLen < 0) {
      charCountElem.css("color", "red");
    } else {
      charCountElem.css("color", "inherit");
    }
  });
});