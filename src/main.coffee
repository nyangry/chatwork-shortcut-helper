$text_area = $("#_chatText")

# shortcuts
do ->
  input_pattern_map =
    to: /[@＠][\s　]/

  shortcuts =
    to: ->
      return true unless input_pattern_map.to.test($text_area.val())
      $text_area.val $text_area.val().replace(input_pattern_map.to, "")
      $("#_to").trigger "click"

  $text_area.on "keyup", ->
    for pattern of input_pattern_map
      shortcuts[pattern]()
    return
