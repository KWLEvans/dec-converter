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
  binaryToDec: function(num) {
    if (num.match(/[^01]/)) {
      return "not binary";
    }else{
      return decFromConversion(num, 2);
    }
  },
  ternaryToDec: function(num) {
    if (num.match(/[^012]/)) {
      return "not ternary";
    }else{
      return decFromConversion(num, 3);
    }
  },
  hexadecimalToDec: function(num) {
    if (num.match(/[^0-9a-f]/i)) {
      return "not hexadecimal";
    }else{
      return decFromConversion(num, 16);
    }
  },
  decToBinary: function(num) {
    return decToConversion(num, 2);
  },
  decToTernary: function(num) {
    return decToConversion(num, 3);
  },
  // decToHexadecimal: function(num)
}

function specialParse(num) {
  if (num.match(/[a-f]/i)) {
    return hexValues[num];
  } else {
    return parseInt(num);
  }
}

function decFromConversion(num, base) {
  var total = 0;
  for (var i = num.length; i > 0; i--){
    var exp = num.length - i;
    var digit = specialParse(num[i - 1]);
    total += (digit * Math.pow(base,exp));
    }
  return total;
}

function highestExp(num, base) {
  var exp = 0;
  for (var i = 0; i >= 0; i++) {
    if (Math.pow(base,i) > num) {
      exp = i - 1;
      break;
    }
  }
  return exp;
}


function decToConversion(num, base) {
  if (num.match(/[0-9]/)) {
    var total = "";
    var num = parseInt(num);
    var exp = highestExp(num, base);
    var remainder = num;

    for (i = exp; i >= 0; i--) {
      var digit = (Math.floor(remainder/Math.pow(base,i))).toString();
      remainder = remainder % Math.pow(base,i);
      total += digit;
    }
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
