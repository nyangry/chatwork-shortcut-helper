# util
util =
  startOfDayTimeStamp: ->
    now = new Date()
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    timestamp = startOfDay / 1000
    timestamp

$text_area = $("#_chatText")

# shortcuts
do ->
  input_pattern_map =
    to: /[@＠][\s　]/
    emotion: /[:：][\s　]/
    task: /[+＋][\s　]/

  shortcuts =
    to: ->
      return true unless input_pattern_map.to.test($text_area.val())
      $text_area.val $text_area.val().replace(input_pattern_map.to, "")
      $("#_to").trigger "click"

    emotion: ->
      return true unless input_pattern_map.emotion.test($text_area.val())
      $text_area.val $text_area.val().replace(input_pattern_map.emotion, "")
      $("#_emoticon").trigger "click"

    task: ->
      return true unless input_pattern_map.task.test($text_area.val())
      $text_area.val $text_area.val().replace(input_pattern_map.task, "")
      $("#_taskNameInput").focus()


  $text_area.on "keyup", ->
    for pattern of input_pattern_map
      shortcuts[pattern]()
    return

# bento
do ->
  $time_line    = $('#_timeLine')
  $chat_buttons = $('#_chatSendTool')

  # 集計ボタンをインサート
  $chat_buttons.append('<li id="_bento" role="button" class="_showDescription" aria-label="Bento の集計"><span class="icoSizeLarge" style="font-size: 12px; background: #444; color: #fff; padding: 2px 5px;  -webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 10px; font-weight: bold; ">B</span></li>')

  $chat_buttons.on 'click', '#_bento', ->
    bentos = {}

    $time_line.find('._message').each ->
      # 今日の日付でなければスルー
      return true if $(@).find('._timeStamp') < util.startOfDayTimeStamp()

      # 指定形式以外のテキストはスルー
      task_text     = $(@).find('.chatInfoTaskContentArea').text()
      matched_array = task_text.match(/([一-龠ー〜ぁ-んァ-ヶ]+)\s*[:：]\s*([一-龠ー〜ぁ-んァ-ヶ]+)/)
      return true unless matched_array

      bentos[matched_array[2]] or= []

      unless matched_array[1] in bentos[matched_array[2]]
        bentos[matched_array[2]].push(matched_array[1])

    for menu, persons of bentos
      person_names = []
      person_names.push "#{person}" for person in persons
      $text_area.val "#{$text_area.val()}\n #{menu} (#{persons.length})：#{person_names.join(', ')}"
