var input_pattern_map = {
  to: /[@＠][\s　]/, 
  emotion: /[:：][\s　]/
};

$text_area = $('#_chatText')

var shortcuts = {
  to: function () {
    console.log(input_pattern_map.to);
    if ( !input_pattern_map.to.test( $text_area.val() ) ) {
      return true;
    }

    $text_area.val( $text_area.val().replace(input_pattern_map.to, '') );
    $('#_to').trigger('click');
  }, 
  emotion: function () {
    if ( !input_pattern_map.emotion.test( $text_area.val() ) ) {
      return true;
    }

    $text_area.val( $text_area.val().replace(input_pattern_map.emotion, '') );
    $('#_emoticon').trigger('click');
  }
};

$text_area.on('keyup', function () {
  for (pattern in input_pattern_map) {
    shortcuts[pattern]();
  };
});
