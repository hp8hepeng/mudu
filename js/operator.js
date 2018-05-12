let operator = {
    init() {
        $(".menu ul li").menu(operator.router);
    },
    ifarme(path) {
        return (path + '.html')
    },
    router(path) {
        console.log(path)
    }

}
console.log('OPERATOR')