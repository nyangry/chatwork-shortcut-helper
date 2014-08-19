$('#_chatText').on('keyup', function () {
  $text_area = $(this);
  if ( !/@\s/.test( $text_area.val() ) ) {
    return true;
  }
  $text_area.val( $text_area.val().replace(/@\s/, '') );
  $('#_to').trigger('click');
});
