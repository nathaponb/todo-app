function errorHandler(err, req, res, next){
    res.status(500).send({ error: err });
}

module.exports = errorHandler