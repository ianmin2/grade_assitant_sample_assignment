const servicesRouter = express.Router();

servicesRouter.route('/')
    .get((req, res) => {

        //@ Attempt to fetch all the data
        $connection.query(`SELECT * FROM vw_services`, [])
            .then(services => {
                res.status(200).json(services);
                c_log(`\n📝\tSent a list of services to ${req.FRAMIFY_USER_INFO.username}.`.succ);
            })
            .catch(err => {
                res.status(400).send(err.message);
                c_log(`\n❌📝\tFailed to send a list of services to ${req.FRAMIFY_USER_INFO.username}.\n\t${err.message}`.err);
            });
    })
    .post((req, res) => {

        c_log(`\n⚙️\tAttempting to add a service for ${req.FRAMIFY_USER_INFO.username}`.info);

        //@ Avail all passed data to the request body
        req.body = getParams(req);

        //@ Ensure that all required parameters are provided
        if (isDefined(req.body, "service_name,service_fee,service_code,service_active")) {
            $connection.query(`INSERT INTO services (service_name,service_fee,service_code,service_active) VALUES ($1,$2,$3,$4);`, [
                    req.body.service_name,
                    req.body.service_fee,
                    req.body.service_code,
                    req.body.service_active
                ])
                .then(inserted => {
                    res.status(201).send(`Service added!`);
                    c_log(`\n⚙️\tService record inserted for ${req.FRAMIFY_USER_INFO.username}.\n\t${inserted}`.info);
                })
                .catch(err => {
                    res.status(400).send(err.errors[0].message || err.message);
                    c_log(`\n❌⚙️\tFailed to add a service for ${req.FRAMIFY_USER_INFO.username}.\n\t${err.errors[0].message || err.message}`.err);
                });
        }
        //@ Fail gracefully
        else {
            res.status(404).send(`The 'service_name', 'service_fee', 'service_code' and 'service_active' service attributes are all required.`);
            c_log(`\n❌⚙️\tFailed to add a service for ${req.FRAMIFY_USER_INFO.username} due to insufficient service data`);
        }



    })

module.exports = servicesRouter;