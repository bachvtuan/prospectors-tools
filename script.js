const max_number = 30;
const min_number = -30;
//should input as x/y. EG: 12/20
var getPointFromInput = function(input_selector){
  var value = $(input_selector).val();
  console.log('value',value)
  if (!value) return false;
  value = value.split("/");
  if (value.length != 2) return false;
  var x = parseInt(value[0])
  var y = parseInt(value[1])

  if (x > max_number || x < min_number  || y > max_number || y < min_number ){
    return false;
  }

  return {
    x: x,
    y: y
  }
}

// Time in minutes = distance * 10
var getTime2Points = function(start_point, end_point){
    var distance = Math.sqrt( Math.pow( start_point.x - end_point.x, 2 )  + Math.pow( start_point.y - end_point.y, 2 ) )
    var in_minutes = Math.ceil(distance * 10);
    return in_minutes;
}

// Conver minutes to readable time EG. 140min = 2h20m
var readableTime = function(minutes){
  console.log('minutes',minutes)
  var hour = Math.floor(minutes/60);
  var minutes = minutes - hour * 60;
  return hour +'h '+ minutes + 'm';
}

var clearResult = function(){
  $('#result').html('');
}

// Get the mid point that nearest start point but goes to end point under 2 hours = 120
var getMidPoint = function(start_point, end_point){
  var result = null;
  var best = null;
  for(var i = min_number; i <= max_number; i++ ){
    for(var j = min_number; j <= max_number; j++ ){
      var temp = {x: i, y:j};
      var time_to_start = getTime2Points( start_point, temp );
      var time_to_end = getTime2Points( end_point, temp );
      if (time_to_end <120){
        if (!best || time_to_start < best){
          result = temp;
          best = time_to_start;
        }
      }
    } 
  }
  return result;
}

$(document).ready(function(){
  $('#cal-time').click(function(){
    var start_point = getPointFromInput('#start-point');
    if (!start_point){
      return alert('Invalid start point');
    }

    var end_point = getPointFromInput('#end-point');
    if (!end_point){
      return alert('Invalid end point');
    }

    $('#result').html(readableTime(getTime2Points(start_point, end_point)))
    
  })
  $('#get-mid-point').click(function(){
    var start_point = getPointFromInput('#start-point');
    if (!start_point){
      return alert('Invalid start point');
    }

    var end_point = getPointFromInput('#end-point');
    if (!end_point){
      return alert('Invalid end point');
    }

    var result = getMidPoint(start_point, end_point);
    if (!result){
      return alert('Unable to find mid point');
    }
    $('#result').html( result.x + "/" + result.y );
    
  })


});
