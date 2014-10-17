(function() {
  var $text_area, util,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  util = {
    startOfDayTimeStamp: function() {
      var now, startOfDay, timestamp;
      now = new Date();
      startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      timestamp = startOfDay / 1000;
      return timestamp;
    }
  };

  $text_area = $("#_chatText");

  (function() {
    var input_pattern_map, shortcuts;
    input_pattern_map = {
      to: /[@＠][\s　]/,
      emotion: /[:：][\s　]/,
      task: /[+＋][\s　]/
    };
    shortcuts = {
      to: function() {
        if (!input_pattern_map.to.test($text_area.val())) {
          return true;
        }
        $text_area.val($text_area.val().replace(input_pattern_map.to, ""));
        return $("#_to").trigger("click");
      },
      emotion: function() {
        if (!input_pattern_map.emotion.test($text_area.val())) {
          return true;
        }
        $text_area.val($text_area.val().replace(input_pattern_map.emotion, ""));
        return $("#_emoticon").trigger("click");
      },
      task: function() {
        if (!input_pattern_map.task.test($text_area.val())) {
          return true;
        }
        $text_area.val($text_area.val().replace(input_pattern_map.task, ""));
        return $("#_taskNameInput").focus();
      }
    };
    return $text_area.on("keyup", function() {
      var pattern;
      for (pattern in input_pattern_map) {
        shortcuts[pattern]();
      }
    });
  })();

  (function() {
    var $chat_buttons, $time_line;
    $time_line = $('#_timeLine');
    $chat_buttons = $('#_chatSendTool');
    $chat_buttons.append('<li id="_bento" role="button" class="_showDescription" aria-label="Bento の集計"><span class="icoSizeLarge" style="font-size: 12px; background: #444; color: #fff; padding: 2px 5px;  -webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 10px; font-weight: bold; ">B</span></li>');
    return $chat_buttons.on('click', '#_bento', function() {
      var bentos, menu, person, person_names, persons, _i, _len, _results;
      bentos = {};
      $time_line.find('._message').each(function() {
        var matched_array, task_text, _name, _ref;
        if ($(this).find('._timeStamp') < util.startOfDayTimeStamp()) {
          return true;
        }
        task_text = $(this).find('.chatInfoTaskContentArea').text();
        matched_array = task_text.match(/([一-龠ー〜ぁ-んァ-ヶ]+)\s*[:：]\s*([一-龠ー〜ぁ-んァ-ヶ]+)/);
        if (!matched_array) {
          return true;
        }
        bentos[_name = matched_array[2]] || (bentos[_name] = []);
        if (_ref = matched_array[1], __indexOf.call(bentos[matched_array[2]], _ref) < 0) {
          return bentos[matched_array[2]].push(matched_array[1]);
        }
      });
      _results = [];
      for (menu in bentos) {
        persons = bentos[menu];
        person_names = [];
        for (_i = 0, _len = persons.length; _i < _len; _i++) {
          person = persons[_i];
          person_names.push("" + person);
        }
        _results.push($text_area.val("" + ($text_area.val()) + "\n " + menu + " (" + persons.length + ")：" + (person_names.join(', '))));
      }
      return _results;
    });
  })();

}).call(this);
