function _createFn(name, method) {
    var strfun = `${name} = ${method}`;
    console.log(strfun);
    eval(strfun);
}

// from https://stackoverflow.com/a/8273091
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

function roll(size) {
    amount = size;
    console.log("Rolling: " + size);
    value = rand(size);
    return value
}

function rand(max) {
    power = Math.floor(Math.log10(max) + 1);
    result = Math.floor((Math.random() * Math.pow(10, power)) + .5) % max + 1;
    return result;
}

range(1, 7).forEach(function (number) {
    console.log(number)
    _createFn(`d6_${number}`, `function(div){console.log("div: ", div, "args:", arguments); _helper(div, ${number})}`);

});

function _helper(div, dice) {
    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    console.log("Settin to ", dice, "\nDiv: ", div);
    div.hide().html(`<label class="dice"><input type="checkbox" value="${dice}"></input><i class="fas fa-dice-${a[dice]} w3-jumbo w3-round-large"></i></label>`).fadeIn('fast');
}

// from https://stackoverflow.com/a/3368280
function sum(arr) {
    var result = 0, n = arr.length || 0; //may use >>> 0 to ensure length is Uint32
    while(n--) {
      result += +arr[n]; // unary operator to ensure ToNumber conversion
    }
    return result;
  }
  