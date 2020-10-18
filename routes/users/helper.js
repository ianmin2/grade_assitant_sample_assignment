//@ User PRE - REGISTRATION MIDDLEWARE
export const extractUserInfo = function(req, res, next) {

    let token = req.headers.authorization

    if (token) {
        token = token.toString().replace(/JWT /ig, '').trim();
    }

    //@ Ensure that the provided access token is valid

    try {

        //@ Verify the provided token
        verifiedJwt = nJwt.verify(token, config.secret);

        //@ If all's good, add a request parameter
        if (verifiedJwt) {
            req.FRAMIFY_USER_INFO = Buffer.from(token.split('.')[1], 'base64').toString('utf-8');
        }



    } catch (e) {
        console.dir(e);
        res
            .status(401)
            .send(`Please login to continue`);
    }

    next();

};