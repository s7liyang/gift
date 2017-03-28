//底部全选栏
function changeallchoose(){
  if ($('#allchoose').is(':checked')){
    $(".allchooseimg").addClass("active");
  } else {
    $(".allchooseimg").removeClass("active");
  }
}
$("#allchoose").on("change",function(){
  changeallchoose();
});

$('.listTop:not(.btn_disabled)>.listTopRadio').bind('click', function () { //主页复选按钮
  if ($(this).children('div').hasClass('listUnchecked')) {
    $(this).children('div').addClass('listChecked').removeClass('listUnchecked');
  } else {
    $(this).children('div').addClass('listUnchecked').removeClass('listChecked');
  }
  //全部选中fasle   否则true
  var flag2 = false;
  var listCheckboxs2=$('.listTopRadio').children('div');
  for (var i=0,len=listCheckboxs2.length;i<len;i++) {
    if ($(listCheckboxs2[i]).hasClass('listUnchecked')) {
      flag2 = true;
    }
  }
  if (flag2) {
    console.log("取消全选");
    document.getElementById("allchoose").checked = false;
    changeallchoose();
  } else {
    console.log("全选");
    document.getElementById("allchoose").checked = true;
    changeallchoose();
  }
  $('.submit-it-mumber').text($('.listChecked').length);
  totalMoney();
});

$('#selectAllButton').bind('click', function () { //全选按钮
  //全部选中fasle   否则true
  var flag = false;
  var listCheckboxs=$('.listTopRadio').children('div');
  for (var i=0,len=listCheckboxs.length;i<len;i++) {
    if ($(listCheckboxs[i]).hasClass('listUnchecked')) {
      flag = true;
    }
  }
  if (flag) {
    $('.listTopRadio').children('div').addClass('listChecked').removeClass('listUnchecked');
    $('.submit-it-mumber').text($('.listChecked').length);
    totalMoney();
  } else {
    $('.listTopRadio').children('div').addClass('listUnchecked').removeClass('listChecked');
    $('.submit-it-mumber').text($('.listChecked').length);
    totalMoney();
  }
});

$('.subtraction').bind('click', function () { //减法
  var mynumber = parseInt($(this).siblings('.selectNumber').text());
  if (mynumber > 1) {
    mynumber--;
  }
  $(this).siblings('.selectNumber').text(mynumber);
  if ($(this).parents('.list').find('.listTopRadio>div').hasClass('listChecked')) {
      totalMoney();
    }
});

$('.addition').bind('click', function () { //加法
  var mynumber = parseInt($(this).siblings('.selectNumber').text());
  mynumber++;
  $(this).siblings('.selectNumber').text(mynumber);
  if ($(this).parents('.list').find('.listTopRadio>div').hasClass('listChecked')) {
      totalMoney();
    }
});

function totalMoney() { //计算总价格
  var total = 0;
  for (var i = 0; i < $('.list').length; i++) {
    if ($('.list').eq(i).find('.listTopRadio>div').hasClass('listChecked')) {
      var tempdom = $('.list').eq(i);
      var pricetemp = parseInt(tempdom.find('.listprice').text());
      var numbertemp = parseInt(tempdom.find('.selectNumber').text());
      total += pricetemp * numbertemp;
    }
  }
  $('#totalmoney').text(total);
}