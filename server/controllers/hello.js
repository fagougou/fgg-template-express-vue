this.sayHello = (req) => {
    // return 'welcome to fgg-web-template, by obj'
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('welcome to fgg-web-template, by promise')
        }, 300)
    })

}
