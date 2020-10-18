const servicesRouter = express.Router();

servicesRouter.route('/')
    .all((req, res) => {
        res.send('😉');
    })

module.exports = servicesRouter;