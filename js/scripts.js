//back end
var hexValues = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15
}

var bases = {
  binary: function(num) {
    if (num.match(/[^01]/)) {
      return "not binary";
    }else{
      return convertNumber(num, 2);
    }
  },
  ternary: function(num) {
    if (num.match(/[^012]/)) {
      return "not ternary";
    }else{
      return convertNumber(num, 3);
    }
  },
  hexadecimal: function(num) {
    if (num.match(/[^0-9a-f]/i)) {
      return "not hexadecimal";
    }else{
      return convertNumber(num, 16);
    }
  }
}

function specialParse(num) {
  if (num.match(/[a-f]/i)) {
    return hexValues[num];
  } else {
    return parseInt(num);
  }
}

function convertNumber(num, base) {
  var total = 0;
  for (var i = num.length; i > 0; i--){
    var exp = num.length - i;
    var digit = specialParse(num[i - 1]);
    total += (digit * Math.pow(base,exp));
    }
  return total;
}



//front end
$(function() {
  function showResult(result){
  $("#result").text(result);
  }
  
  $("#converter").submit(function(event) {
      event.preventDefault();

      var base = $("#base option:selected").val();
      var input = $("#converter input").val();
      var result = bases[base](input);

      showResult(result);
    })
  });
