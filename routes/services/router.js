const servicesRouter = express.Router();

function getService(service_id) {
    return new Promise((resolve, reject) =>
        $connection.query(`SELECT * FROM vw_services WHERE service_id=$1`, [
            service_id
        ])
        .then(services => {
            if (!services[0]) throw Error(`No such service record was found.`);
            resolve(services);
        })
        .catch(err => {
            reject(err.message);
        })
    )
}

function ensuremiddleWareExists(req, res, next) {
    if (!req.FRAMIFY_USER_INFO) {
        req.FRAMIFY_USER_INFO = {};
    }
    next();
}

servicesRouter.route('/')
    .get(ensuremiddleWareExists, (req, res) => {

        c_log(`\n⚙️\tAttempting to fetch a list of services for ${req.FRAMIFY_USER_INFO.username}`.info);

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
    .post(ensuremiddleWareExists, (req, res) => {

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
                    c_log(`\n✔⚙️\tService record inserted for ${req.FRAMIFY_USER_INFO.username}.\n\t${inserted}`.info);
                })
                .catch(err => {
                    res.status(400).send(err.errors[0].message || err.message);
                    c_log(`\n❌⚙️\tFailed to add a service for ${req.FRAMIFY_USER_INFO.username}.\n\t${err.errors[0].message || err.message}`.err);
                });
        }
        //@ Fail gracefully
        else {
            res.status(400).send(`The 'service_name', 'service_fee', 'service_code' and 'service_active' service attributes are all required.`);
            c_log(`\n❌⚙️\tFailed to add a service for ${req.FRAMIFY_USER_INFO.username} due to insufficient service data`);
        }

    })


servicesRouter.route('/:service_id')
    .get(ensuremiddleWareExists, (req, res) => {

        c_log(`\n⚙️\tAttempting to fetch service #${req.params.service_id} for ${req.FRAMIFY_USER_INFO.username}`.info);

        //@ Ensure that the passed service identifier is numeric
        req.params.service_id = parseInt(req.params.service_id);

        if (!isNaN(req.params.service_id)) {

            //@ Attempt to fetch the specified service
            $connection.query(`SELECT * FROM vw_services WHERE service_id=$1`, [
                    req.params.service_id
                ])
                .then(services => {
                    if (services[0]) {
                        res.status(200).json(services[0]);
                        c_log(`\n✔`.succ + `⚙️\tService #${req.params.service_id} record fetched for ${req.FRAMIFY_USER_INFO.username}`.info);
                    } else {
                        res.status(404).send(`The specified service was not found!`);
                        c_log(`\n❌⚙️\tService #${req.params.service_id} record was not found fetched for ${req.FRAMIFY_USER_INFO.username}`.err);
                    }
                })
                .catch(err => {
                    res.status(400).send(err.errors[0].message || err.message);
                    c_log(`\n❌⚙️\tFailed to fetch a service for ${req.FRAMIFY_USER_INFO.username}.\n\t${err.errors[0].message || err.message}`.err);
                })

        }
        //@ Ask the requestor to provide a numeric identifier
        else {
            res.status(404).send(`Please provide a numeric service identifier.`);
        }

    })
    .put(ensuremiddleWareExists, (req, res) => {

        c_log(`\n⚙️\tAttempting to update service #${req.params.service_id} for ${req.FRAMIFY_USER_INFO.username}`.info);

        //@ Ensure that the passed service identifier is numeric
        req.params.service_id = parseInt(req.params.service_id);

        if (!isNaN(req.params.service_id)) {

            //@ Ensure that a service record exists 
            getService(req.params.service_id)
                .then(d => {

                    //@ Avail all passed data to the request body
                    req.body = getParams(req);

                    //@ Ensure that all required parameters are provided
                    if (isDefined(req.body, "service_name,service_fee,service_code,service_active")) {

                        //@ Attempt to fetch the specified service
                        $connection.query(`UPDATE services SET service_name=$1, service_fee=$2, service_code=$3, service_active=$4 WHERE service_id=$5`, [
                                req.body.service_name,
                                req.body.service_fee,
                                req.body.service_code,
                                req.body.service_active,
                                req.params.service_id
                            ])
                            .then(services => {

                                res.status(200).send(`Service #${req.params.service_id} updated!`);
                                c_log(`\n✔`.succ + `⚙️\tService #${req.params.service_id} updated for ${req.FRAMIFY_USER_INFO.username}`.info);

                            })
                            .catch(err => {
                                res.status(400).send(err.errors[0].message || err.message);
                                c_log(`\n❌⚙️\tFailed to update service #${req.params.service_id} for ${req.FRAMIFY_USER_INFO.username}.\n\t${err.errors[0].message || err.message}`.err);
                            })

                    }
                    //@ Fail gracefully
                    else {
                        res.status(404).send(`The 'service_name', 'service_fee', 'service_code' and 'service_active' service attributes are all required.`);
                        c_log(`\n❌⚙️\tFailed to update service #${req.params.service_id} for ${req.FRAMIFY_USER_INFO.username} due to insufficient service data`);
                    }

                })
                .catch(e => res.status(404).send(e))

        }
        //@ Ask the requestor to provide a numeric identifier
        else {
            res.status(404).send(`Please provide a numeric service identifier.`);
        }

    })
    .delete(ensuremiddleWareExists, (req, res) => {

        c_log(`\n⚙️\tAttempting to delete service #${req.params.service_id} for ${req.FRAMIFY_USER_INFO.username}`.info);

        //@ Ensure that the passed service identifier is numeric
        req.params.service_id = parseInt(req.params.service_id);

        if (!isNaN(req.params.service_id)) {

            //@ Ensure that a service record exists 
            getService(req.params.service_id)
                .then(d => {

                    //@ Attempt to fetch the specified service
                    $connection.query(`DELETE FROM services WHERE service_id=$1`, [
                            req.params.service_id
                        ])
                        .then(services => {

                            res.status(200).send(`Service #${req.params.service_id} deleted!`);
                            c_log(`\n✔`.succ + `⚙️\tService #${req.params.service_id} deleted for ${req.FRAMIFY_USER_INFO.username}`.info);

                        })
                        .catch(err => {
                            res.status(400).send(err.errors[0].message || err.message);
                            c_log(`\n❌⚙️\tFailed to delete service #${req.params.service_id} for ${req.FRAMIFY_USER_INFO.username}.\n\t${err.errors[0].message || err.message}`.err);
                        })



                })
                .catch(e => res.status(404).send(e))

        }
        //@ Ask the requestor to provide a numeric identifier
        else {
            res.status(404).send(`Please provide a numeric service identifier.`);
        }
    })

module.exports = servicesRouter;