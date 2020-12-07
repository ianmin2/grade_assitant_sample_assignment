const extractJwt = passport_jwt.ExtractJwt;
const jwtStrategy = passport_jwt.Strategy;

console.log(`\n🔐\tInitializing authentication`.yell)

const opts = {};

opts.jwtFromRequest = extractJwt.fromAuthHeader(); //.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
// opts.audience = myAddr;
// opts.issuer = myAddr;

passport.use(new jwtStrategy(opts, (jwt_payload = {}, done) => {

    console.log(`\n🔍\tAuthentication invoked @passport`.info);



    console.dir(jwt_payload);

    $connection.query('SELECT * FROM vw_members WHERE member_id=$1 AND username=$2 AND active=$3', [
            jwt_payload.member_id,
            jwt_payload.username,
            true
        ])
        .then(function(user) {

            console.dir(user)

            if (user) {
                done(null, user[0]);
            } else {
                done(err, false);
            }

        })
        .catch(function(err) {
            return done(err, false);
        });

}));


c_log(`\n✔✔\t`.succ + `Loaded member authentication via sql ---.`.succ);