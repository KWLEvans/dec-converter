//back end
var hexValues = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  "10": "a",
  "11": "b",
  "12": "c",
  "13": "d",
  "14": "e",
  "15": "f"
}

var bases = {
  binaryToDec: function(num) {
    if (num.match(/[^01]/)) {
      return "not binary";
    } else {
      return decFromConversion(num, 2);
    }
  },

  ternaryToDec: function(num) {
    if (num.match(/[^012]/)) {
      return "not ternary";
    } else {
      return decFromConversion(num, 3);
    }
  },

  hexadecimalToDec: function(num) {
    if (num.match(/[^0-9a-f]/i)) {
      return "not hexadecimal";
    } else {
      return decFromConversion(num, 16);
    }
  },

  decToBinary: function(num) {
    return decToConversion(num, 2);
  },

  decToTernary: function(num) {
    return decToConversion(num, 3);
  },

  decToHexadecimal: function(num) {
    num = this.decToBinary(num);
    return this.binaryToHexadecimal(num);
  },

  binaryToTernary: function(num) {
    num = this.binaryToDec(num).toString();
    return this.decToTernary(num);
  },

  ternaryToBinary: function(num) {
    num = this.ternaryToDec(num).toString();
    return this.decToBinary(num);
  },

  ternaryToHexadecimal: function(num) {
    num = this.ternaryToBinary(num);
    return this.binaryToHexadecimal(num);
  },

  binaryToHexadecimal: function(num) {
    var result = "";
    var chunks = [];
    if (num.length % 4 !== 0) {
      num = zerofy(num);
    }

    for (i = 0; i < num.length; i += 4) {
      chunks.push(num.substr(i, 4));
    }

    chunks.forEach(function(chunk) {
      var digit = bases.binaryToDec(chunk).toString();
      if (digit.length > 1) {
        digit = hexValues[digit];
      }
      result += digit;
    });
    return result;
  }
}

function specialParse(num) {
  if (num.match(/[a-f]/i)) {
    return hexValues[num];
  } else {
    return parseInt(num);
  }
}

//returns a number
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

//Returns a string
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

function zerofy(num) {
  var zerosToAdd = 4 - (num.length % 4);
  var zeroString = "";
  function addZeros(times) {
    for (i = 1; i <= times; i++) {
      zeroString += "0";
    }
  }
  addZeros(zerosToAdd);

  result = zeroString + num;
  return result;
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
    });
  });
