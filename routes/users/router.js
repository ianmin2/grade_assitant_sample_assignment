let auth = express.Router();




//@ REGISTER NEW USERS
auth.route("/register")
    .post((req, res) => {

        c_log(`\n\tAttempting a user registration`.info);

        var params = get_params(req);

        if (isDefined(params, "password,username,name")) {

            //@ md5 is used for its simplicity 
            //[for rather obvious security purposes, I wouldn't advocate for its use in ANY production-level projects]
            params.password = crypt.md5(params.password);

            $query = `INSERT INTO members (password,username,full_name) VALUES ($1,$2,$3)`;

            $connection.query($query, [
                    params.password,
                    params.username,
                    params.name
                ])
                .then(inserted => {

                    c_log(`\n\tUser created! ${inserted}`.succ);

                    res.status(201).send(`User created!`);

                })
                .catch(error => {
                    console.error(error)
                    c_log(`\n\tFailed to register the user ${params['name.first']}.\n\t\t${str(error.message)}\n\t\t${error.errors[0].message}`.err);
                    res.status(400).send(`Failed to record the user. (${error.errors[0].message})`);
                });

        } else {

            res.status(400).send(`A name, username and password are required for a successful registration. We only got ${Object.keys(params).join(' ')}.`);

        }

    });

//@ AUTHENTICATE THE USER AND ISSUE A jwt
auth.route("/login")
    .post((req, res) => {

        console.log(`\n\tAttempting a login`.info);

        req.body = get_params(req);

        if (isDefined(req.body, "username,password")) {

            $connection.query(`SELECT * FROM vw_members WHERE username=$1`, [req.body.username])
                .then(user => {

                    //@ Ensure account exists
                    if (!user[0]) {
                        res.status(401).send(`Login for ${req.body.username} failed!`);


                    }
                    //@ Ensure that the account is active 
                    else if (!user[0].active) {
                        res.status(401).send(`The account ${req.body.username} has been terminated!`);
                    } else {

                        var memba = user[0];

                        //@ Ensure that the passwords match
                        if (memba.password == crypt.md5(req.body.password)) {

                            //@ Translate the 'full_name' to 'name' [for consistency]
                            memba.name = `${memba.full_name}`;

                            //@ Hide the password [and full_name] from the world
                            memba.password = undefined;
                            memba.full_name = undefined;

                            //@ Generate an accesstoken containing the user data
                            var token = jwt.sign(memba, config.secret, { expiresIn: 36000000000000, issuer: myAddr })

                            //@ Return the access token to the user
                            res.status(200).json({ token: `JWT ${token}` });


                        } else {

                            res.status(401).send(`Account validation failed!`);

                        }

                    }

                });


        } else {

            res.status(401).send(`A username and password are expected for validation.`);

        }

    });

//@ SAMPLE PROTECTED ROUTE THAT RETURNS THE LOGED IN USER'S INFORMATION
auth.route('/me')
    .all(passport.authenticate('jwt', { session: false }), function(req, res) {

        // console.log(`Attempting a profile data fetch`.info)        
        $connection.query(`SELECT * FROM vw_members WHERE email=$1 AND active=true`, [req.whoami.email])
            .then(memberRecord => {

                let l = clone(memberRecord[0]);
                l.password = undefined;
                l._id = undefined;
                l.__v = undefined;

                res.send(make_response(200, l));

            })
            .catch(e => {
                res.send(make_response(500, e.message));
            });

    });

module.exports = auth;