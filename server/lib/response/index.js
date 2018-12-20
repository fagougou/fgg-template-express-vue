/**
 * combine your handler method and req, res
 * @param {func} handler
 * @return {object}
**/
const responseHandler = (handler) => (req, res, next) => {

    try {
        handler(req, res).then((resolved) => {
            if (req.directResponse) {
                res.send(resolved)
            } else {
                res.send({
                    code: 0,
                    message: 'OK',
                    data: resolved
                })
            }
        }).catch((error) => {
            return next(error)
        })
    } catch (e){
        console.error('handler error: ', e)

        return next(e)
    }

}


module.exports = {
    responseHandler
}
