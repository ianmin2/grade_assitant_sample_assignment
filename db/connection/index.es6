module.exports = (db_config) => {
    db_config.pool = db_config.pool || { max: 100, min: 3, acquire: 30000, idle: 10000 };

    Object.assign(global, {
        sqldb: new Sequelize(db_config.database, db_config.user, db_config.password, db_config.extras)
    });

    try {
        sqldb.authenticate();
        console.log(`\n💾\tDatabase connection successfully established.`.succ);
    } catch (error) {
        console.error('\n⚠️\tUnable to connect to the database:', error);
    }
};