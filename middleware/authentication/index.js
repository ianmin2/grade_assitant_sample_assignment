var extractJwt = passport_jwt.ExtractJwt;
var jwtStrategy = passport_jwt.Strategy;

module.exports = (passport) => {

    var opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {

        $connection.query('SELECT * FROM vw_members WHERE member_id=$1 AND username=$2 AND active=$3', [jwt_payload.member_id,
                jwt_payload.username,
                1
            ])
            .then(function(user) {

                if (user) {
                    done(null, user[0]);
                } else {
                    done(null, false);
                }

            })
            .catch(function(err) {
                return done(err, false);
            });

    }));

};

c_log(`\n✔✔\t`.succ + `Loaded member authentication via sql.\n`.succ);