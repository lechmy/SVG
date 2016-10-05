// var svg = document.getElementsByTagName('svg')[0];
var startPoint = {};
var tempX, tempY;
$(document).ready(function(){
  // $('svg').on('mousedown', startDraw);
  // $('svg').on('mouseup', endDraw);
  // $('svg').children().on('mousedown', positionStart);
  // $('svg').children().on('mouseup', positionEnd);
  $('svg').on('mousemove', snap);
  var svg = document.getElementsByTagName('svg')[0];
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  newElement.setAttribute("id",'point');
  newElement.setAttribute("cx",300);
  newElement.setAttribute("cy",300);
  newElement.setAttribute("r", 20);
  svg.appendChild(newElement);
});

function startDraw(e){
  startPoint.x=e.pageX;
  startPoint.y=e.pageY;
  var svg = document.getElementsByTagName('svg')[0];
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  newElement.setAttribute("class","rect");
  newElement.setAttribute("x",startPoint.x - $('svg').offset().left);
  newElement.setAttribute("y",startPoint.y - $('svg').offset().top);
  svg.appendChild(newElement);
  $('svg').on('mousemove',sizeChange);
}

function endDraw(e){
  // if($('svg').children().last().width()<50 || $('svg').children().last().height()<50){
  //   $('svg').children().last().remove();
  // }
  $('svg').off('mousemove');
}

function sizeChange(e){
  $('svg').children().last().attr({
    width: e.pageX - startPoint.x,
    height: e.pageY - startPoint.y
  });
}
function positionStart(e){
  e.stopPropagation();
  tempX = e.pageX;
  tempY = e.pageY;
  startPoint.x = $(this).attr('x');
  startPoint.y = $(this).attr('y');
  $('svg').children().on('mousemove', positionChange);
}
function positionEnd(e){
  e.stopPropagation();
  $('svg').children().off();
}

function positionChange(e){
  e.stopPropagation();
  // debugger;
  // $('svg').children('').attr({
  $(this).attr({
    x: parseInt(startPoint.x) + (e.pageX - tempX),
    y: parseInt(startPoint.y) + (e.pageY - tempY)
  });
}

function snap(e){
  var point = $('#point');
  point.attr("cx", e.pageX - $('svg').offset().left);
  point.attr("cy", e.pageY - $('svg').offset().top);
  var x = parseInt(point.attr("cx"));
  var y = parseInt(point.attr("cy"));
  if(x > 50 && x < 200 && Math.abs(y - parseInt($('#wall').attr('y'))) < 30){
    point.attr("cy", 20);
  }
  if(y > 20 && y < 170 && Math.abs(x - parseInt($('#wall').attr('x'))) < 30){
    point.attr("cx", 50);
  }
}
