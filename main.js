(function(){var t,n,e=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};n={startOfDayTimeStamp:function(){var t,n,e;return t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),e=n/1e3}},t=$("#_chatText"),function(){var n,e;return n={to:/[@＠][\s　]/},e={to:function(){return n.to.test(t.val())?(t.val(t.val().replace(n.to,"")),$("#_to").trigger("click")):!0}},t.on("keyup",function(){var t;for(t in n)e[t]()})}(),function(){var a;return a=$("#_chatSendTool"),a.append('<li id="_bento" role="button" class="_showDescription" aria-label="Bento の集計"><span class="icoSizeLarge" style="font-size: 12px; background: #444; color: #fff; padding: 2px 5px;  -webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 10px; font-weight: bold; ">B</span></li>'),a.on("click","#_bento",function(){var a,r,i,o,s,l,c,u;a={},$("#_timeLine").find("._message").each(function(){var t,r,i,o;return $(this).find("._timeStamp").data("tm")<n.startOfDayTimeStamp()?!0:(r=$(this).find(".chatInfoTaskContentArea").text(),(t=r.match(/([一-龠ー〜ぁ-んァ-ヶ]+)\s*[:：]\s*(.+)/))?(a[i=t[2]]||(a[i]=[]),o=t[1],e.call(a[t[2]],o)<0?a[t[2]].push(t[1]):void 0):!0)}),u=[];for(r in a){for(s=a[r],o=[],l=0,c=s.length;c>l;l++)i=s[l],o.push(""+i);u.push(t.val(""+t.val()+"\n "+r+" ("+s.length+")："+o.join(", ")))}return u})}()}).call(this);