$("#new-tweet__text").on("input paste", function() {
  const MAX_CHAR_LEN = 140;
  const currentLen = $(this).val().length;
  const remainingLen = MAX_CHAR_LEN - currentLen;

  const charCountElem = $(this).parent().find(".new-tweet__counter");
  charCountElem.val(remainingLen);

  if (remainingLen < 0) {
    charCountElem.css("color", "#a52828");
  } else if (remainingLen < 10) {
    charCountElem.css("color", "orange");
  } else {
    charCountElem.css("color", "inherit");
  }
  
  /* auto-resize text area based on user input */
  this.style.height = "auto";
  this.style.height = `${(this.scrollHeight)}px`;

});
