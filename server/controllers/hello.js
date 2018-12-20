this.sayHello = (req) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('welcome to fgg-web-template')
        }, 300)
    })

}
