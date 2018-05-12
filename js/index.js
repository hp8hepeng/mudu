$(function() {
    operator.init()
})


$('body').on('click', '.menu a[data-router]', function() {
    let iframe = $('#fd-Iframe');
    let path = $(this).data('router')
    let.get(0).src = operator.ifarme(path)
})