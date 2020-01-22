
function setup_accordians() {
    $('.accordion').each(function () {
        $(this).click(function () {
            $(this).toggleClass("active");
            var panel = $(this).next('.panel').get(0);
            if ($(this).hasClass('active')) {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            else {
                panel.style.maxHeight = null;
            }
        })
    });
}
