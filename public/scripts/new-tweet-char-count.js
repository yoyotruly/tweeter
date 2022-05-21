$("#new-tweet__text").on("input paste", function() {
  const MAX_CHAR_LEN = 140;
  const currentLen = $(this).val().length;
  const remainingLen = MAX_CHAR_LEN - currentLen;

  const charCountElem = $(this).parent().find(".new-tweet__counter");
  charCountElem.val(remainingLen);

  if (remainingLen < 0) {
    charCountElem.css("color", "#a52828");
    $('.new-tweet__btn').prop('disabled', true);
  } else if (remainingLen < 10) {
    charCountElem.css("color", "orange");
  } else {
    charCountElem.css("color", "inherit");
  }
});
