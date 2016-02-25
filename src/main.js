var $text_area;

$text_area = $("#_chatText");

(function() {
  var input_pattern_map, shortcuts;
  input_pattern_map = {
    to: /[@＠][\s　]/
  };
  shortcuts = {
    to: function() {
      if (!input_pattern_map.to.test($text_area.val())) {
        return true;
      }
      $text_area.val($text_area.val().replace(input_pattern_map.to, ""));
      return $("#_to").trigger("click");
    }
  };
  return $text_area.on("keyup", function() {
    var pattern;
    for (pattern in input_pattern_map) {
      shortcuts[pattern]();
    }
  });
})();
