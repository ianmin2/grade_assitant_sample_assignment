//@ +======================================================================================
//# Application and data handling setup

const passport = require("passport");

//@ SETUP BODY PARSER MIDDLEWARE 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//@ +====================================================================================
//# Essential &  swichable application running

//@ Define the authentication database [sql,mongo]  -- at the verge of deprecation 
global.authMeth = "sql";


//@ +====================================================================================
//# General configuration

//@ Import the main configuration file
Object.assign(global, { config: require(path.join(__dirname, '../config/config')) });

//@ Avail encrypt/decrypt helper mthods globally
Object.assign(global, require(path.join(__dirname, '/helpers/encryption')));

//@ Set the application's running port
try {
    const port = parseInt(config.port);
    if (isNaN(port)) throw Error(`\n❌ 🤦‍\tDo I have to ask you to ensure that the provied port number is an actual number? 🙄\n\n\t`.info + `${config.port}! Really?\n\t` + `Make sure that the content of`.err + ` config/port.conf ` + `is numeric\n`.err);
    app.port = port;
} catch (err) {
    c_log(err.message);
    process.exit(0);
}


//@ +======================================================================================
//# Authentication Related configuration

//@ Initialize passport for use
app.use(passport.initialize());

//@ Import the JWT generation middleware
require(path.join(__dirname, `../middleware/authentication/passport`));

Object.assign(passport, { loginValidate: require(path.join(__dirname, `../middleware/authentication/login-validate`)) })



//@ +======================================================================================
//# Database connection Related configuration


//@ Import the database initialization service
//@ Initialize the database service [instantiates a global [sqldb]]
require(path.join(__dirname, `../db/db.es6`));