let operator = {
    init() {
        $(".menu ul li").menu(operator.router);
    },
    ifarme(path) {
        return (path + '.html')
    },
    router(path) {
        let iframe = $('#fd-Iframe');
        iframe.get(0).src = operator.ifarme(path)
    }
}