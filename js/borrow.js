$(function () {
    $('.apply_btn').each(function (index) {
        $(this).click(function () {
            sessionStorage.setItem('borrowType', Number(JSON.stringify(index)) + 1);
        })
    })
})