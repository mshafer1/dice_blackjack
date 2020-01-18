dice_size = 6;

var values = [];

var count = 0;

function start() {
    $('.js_reset').hide();
    $('.js_again_row').remove();

    values = [];
    i1 = $('#init1');
    i2 = $("#init2");

    val1 = roll(dice_size);
    val2 = roll(dice_size);
    values.push(val1, val1, val2, val2);
    call('d' + dice_size + '_' + val1, i1);
    call('d' + dice_size + '_' + val2, i2);
    $('.dice>input[type=checkbox]').attr('checked', true).attr('disabled', true);
    check_score([sum(values)]);
}

function _setup_again() {
    count += 1;

    var _new_again_row = `
    <div class="w3-row w3-margin-top js_again_row ">
        <div class="w3-col s6 w3-center js_reset" style="display:none" id="again${count}_1"></div>
        <div class="w3-col s6 w3-center js_reset" style="display:none" id="again${count}_2"></div>
    </div>
    `

    $('#again').appendTo('.js_stack').fadeIn('slow');

    var _div = document.createElement('div')
    $('.js_stack').append(_new_again_row)
    $('.js_again_row').fadeIn('slow');
}

function again() {
    $('.dice>input[type=checkbox]').attr('disabled', true);
    $('#again').fadeOut('slow', function () {
        a1 = $(`#again${count}_1`);
        a2 = $(`#again${count}_2`);

        val1 = roll(dice_size);
        val2 = roll(dice_size);
        call('d' + dice_size + '_' + val1, a1);
        call('d' + dice_size + '_' + val2, a2);

        possibles = [sum(values) + val1, sum(values) + val2, sum(values) + val1 + val2];
        possibles.sort(function (a, b) { return b - a });
        console.log(possibles);

        check_score(possibles);
        // $('#again').delay(1000).fadeIn('slow');
    });
}

function check_score(possibles) {
    var value = "!!BUST!!";
    var find = possibles.findIndex(element => element <= 21);
    if (find != -1) {
        value = possibles[find];
    }
    $('#value').fadeOut('medium', function () {
        $(this).html(value).fadeIn('slow');
        if (find != -1) {
            _setup_again();
        }
    });
    values.push(val1, val2);
}

function call(func) {
    console.log(func);
    var _arguments = [].slice.call(arguments);
    window[func].apply(this, _arguments.slice(1));
}
