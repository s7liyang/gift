// 加载列表项
$.get(
    "/data/game.json",
    function(data){
      console.log(data);
      function loadData(list){
        var html="";
        $.each( list, function(i, n){
          html += `<div class="item"><a href="list.html?key=${n}" external>${n}</a></div>`;
        });
        return html;
      }
      
      $("#who").html(loadData(data[0].who));
      $("#what").html(loadData(data[1].what));
      $("#when").html(loadData(data[2].when));
      $("#diy").html(loadData(data[3].diy));
    }
)