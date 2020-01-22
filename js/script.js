---
---
dice_size = 6;

var values = [];
var taken_values = [];

const find_all_dice = '.dice > input[type=checkbox]';

var count = 0;

function showRules() {
   showMsg(`
    {% include rules.html %}
    `, "How to Play:")
}

function showMsg(msg, title) {
    $('#msgModal').hide();
    $('#msgHeader').html(title);
    $('#msgBody').html(msg);
    setup_accordians();
    $('#msgModal').show();
}

function start() {
    // count = -1;
    $('.js_reset').hide();

    values = [];
    taken_values = [];
    i1 = $('#init1');
    i2 = $("#init2");

    val1 = roll(dice_size);
    val2 = roll(dice_size);
    values.push(val1, val1, val2, val2);
    call('d' + dice_size + '_' + val1, i1);
    call('d' + dice_size + '_' + val2, i2);
    $(find_all_dice).attr('checked', true).attr('disabled', true);
    window.setTimeout(function () {
        set_score_tally('i', sum([val1, val2]) * 2);
        taken_values.push(val1, val1, val2, val2);
    }, 500)

    check_score([sum(values)]);

}

function set_score_tally(index, value) {
    var id = `#row${index}_total`;
    console.log("ID: ", id, "Total: ", value);
    $(id).html(` + ${value}`)

    var total = sum(taken_values) + value;
    $('#value').fadeOut('medium', function () {
        $(this).html(total).fadeIn('medium');
    });
}

function _setup_again() {


    var _new_again_row = `
    <div class="w3-row w3-margin-top js_reset">
        <div class="w3-col s2">&nbsp;</div>
        <div class="w3-col s3 w3-center js_reset js_${count}_input" style="display:none" id="again${count}_1"></div>
        <div class="w3-col s2 w3-center">&nbsp;</div>
        <div class="w3-col s3 w3-center js_reset js_${count}_input" style="display:none" id="again${count}_2"></div>
        <div class="w3-col s2 w3-border-left w3-border-white"><span id="row${count}_total"></span></div>
    </div>
    `

    $('.js_stack').append(_new_again_row)
    $('#again').appendTo('.js_stack').fadeIn('slow');
}

function update_tally_marker(index) {
    var input_selector = `.js_${index}_input >.dice> input[type=checkbox]:checked`
    console.log("Inputs: ", $(input_selector))
    var values = []
    var checked = $(input_selector)
    $.each(checked, function () {
        values.push(
            parseInt($(this).val())
        );
    });

    set_score_tally(index, sum(values));
    console.log("Values: ", values, "\n\tIndex: ", index);
}

function stand() {
    showMsg(`<h2 class="w3-center">${sum(taken_values)}</h2>`, "Final Score:");
    $('#again').hide();
}

function hit() {
    // check that at least one was selected
    var input_selector = `.js_${count - 1}_input >.dice> input[type=checkbox]:checked`
    var checked = $(input_selector)
    // if not first time, but no values selected, show warning and quit.
    if (count > 0 && checked.length == 0) {
        showMsg(`You <b>must</b> select at least one die to continue`, "Select at least one to Continue");
        return;
    }

    $(find_all_dice).attr('disabled', true);
    $.each($(input_selector), function () {
        taken_values.push(
            parseInt($(this).val())
        );
    });
    $('#again').fadeOut('slow', function () {
        a1 = $(`#again${count}_1`);
        a2 = $(`#again${count}_2`);

        val1 = roll(dice_size);
        val2 = roll(dice_size);
        call('d' + dice_size + '_' + val1, a1);
        call('d' + dice_size + '_' + val2, a2);


        console.log("Count: ", count);
        check_box = $(`#again${count}_1 > ${find_all_dice}`);
        check_box.change(function () {
            console.log($(this));
            update_tally_marker(count - 1);
        })
        $(`#again${count}_2 > ${find_all_dice}`).change(function () {
            console.log($(this));
            update_tally_marker(count - 1);
        })

        count += 1;

        possibles = [sum(taken_values) + val1, sum(taken_values) + val2, sum(taken_values) + val1 + val2];
        possibles.sort(function (a, b) { return b - a });
        console.log(possibles);

        check_score(possibles);
        values.push(val1, val2);

        $(`#again${count-1}_1 > ${find_all_dice}`).attr('disabled', sum(taken_values) + val1 > 21);
        $(`#again${count-1}_2 > ${find_all_dice}`).attr('disabled', sum(taken_values) + val2 > 21);
    });
}

function check_score(possibles) {
    var value = "!!BUST!!";
    var find = possibles.findIndex(element => element <= 21);
    if (find != -1) {
        value = possibles[find];
    }
    if (find != -1) {
        _setup_again();
    } else {
        // bust
        $(find_all_dice).attr('disabled', true);
        $('.js_stack').append('<div class="w3-center js_reset"><h1>!!BUST!!</h1></div>');

        $('#value').fadeOut('medium', function () {
            $(this).html(value).fadeIn('slow');
        });
    }
}

function call(func) {
    console.log(func);
    var _arguments = [].slice.call(arguments);
    window[func].apply(this, _arguments.slice(1));
}
