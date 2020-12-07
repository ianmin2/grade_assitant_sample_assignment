//@ User PRE - REGISTRATION MIDDLEWARE
module.exports = function(req, res, next) {



    let token = req.headers.authorization || `a.b.c`;

    console.log(`\n🔍\tAuthentication invoked ...`.info);

    log(token);
    log(req.headers);

    //@ Ensure that the provided access token is valid

    try {

        if (token) {
            token = token.toString().replace(/JWT |Bearer /ig, '').trim();
        }


        //@ Verify the provided token
        verifiedJwt = nJwt.verify(token, config.secret);

        //@ If all's good, add a request parameter
        if (verifiedJwt) {
            req.FRAMIFY_USER_INFO = verifiedJwt.body || {};
        } else {
            throw new Error(`Failed to capture user info from access token.`)
        }

        c_log(`\n🔓\tAccess granted to ${req.FRAMIFY_USER_INFO.username}`.succ);

        next();

    } catch (e) {
        c_log(`\n❌🔒\t${e.message}`);
        res
            .status(401)
            .send(`Please login to continue`);
    }

};