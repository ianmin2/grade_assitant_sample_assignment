const acccessStream = fs.createWriteStream(path.join(__dirname, '/access.log'), { flags: 'a' });

module.exports = (req, res, next) => {

        acccessStream.write(`${new Date().toISOString()}\t${str({
        path: `${req.method} ${req.path}`,
        headers: req.headers,
        body: req.body
    })}\n\n`);

    next();
}