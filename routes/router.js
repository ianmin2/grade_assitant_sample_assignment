app.use('/', express.static(path.join(__dirname, '../views')));

//@ Load the user registration and authentication handler
app.use(`/users`, require(path.join(__dirname, `/users/router`)));

//@ Load the service CRUD handler
app.use(`/services`, passport.authenticate('jwt', { session: false }), require(path.join(__dirname, `/services/router`)));