//@ Load the base application framework  [also developed by Ian Kamau]
require("liteframe");

//@ load the request logger
app.use(require(path.join(__dirname, "/../middleware/logger/index")));

//@ Load the application base configurator
require(`./configurator`);

//@ Load the  application routes
require(`../routes/router`);

//@ Set up the application listener
server.listen(app.port, function(err) {
    if (!err) {
        c_log(`\n🌟 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟\n\n\tRunning server at `.success + `http://${myAddr}:${app.port}\n\n🌟 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟\n`);
    } else {
        c_log(`\n❌ 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n\n\tFailed to run the service at `.yell + `http://${myAddr}:${app.port}` + `\n\tReason:\n\t`.info + `${err}\n\n❌ 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n`.err);
        process.exit(0);
    }
});

//@ Handle application exits gracefully
require(path.join(__dirname, `/helpers/cleanup`))();


// Handle 404
app.use(function(req, res) {
    res.status(404).json(make_response(404, '404: Page not Found'));
});

// Handle 401
app.use(function(req, res) {
    res.status(401).json(make_response(401, '401: Unauthorized'));
});