const methods = {
    //@ require();
    import: true,
    //@ fs.readFileSync()
    read: false,
};

let files = {
    port_config: {
        verb: `port`,
        method: methods.import,
        default: '',
        file: path.join(__dirname, `port.conf`),
        required: true,
        message: path.join(__dirname, `templates/error/port.error`),
    },
    jwt_secret: {
        verb: `secret`,
        default: 'ianmin2',
        method: methods.import,
        file: path.join(__dirname, `jwt-secret.conf`),
        required: true,
        message: path.join(__dirname, `templates/error/jwt-secret.error`),
    },
    sql_config: {
        verb: `sql`,
        method: methods.read,
        default: {},
        file: path.join(__dirname, `sql.conf`),
        required: true,
        message: path.join(__dirname, `templates/error/sql.error`),
    },
    sms_config: {
        verb: `sms`,
        method: methods.read,
        default: {},
        file: path.join(__dirname, `sms.conf`),
        required: false,
        message: path.join(__dirname, `templates/error/sms.error`),
    },
    email_config: {
        verb: `email`,
        method: methods.read,
        default: {},
        file: path.join(__dirname, `email.conf`),
        required: false,
        message: path.join(__dirname, `templates/error/email.error`),
    },
    mongo_config: {
        verb: `mongo`,
        method: methods.read,
        default: {},
        file: path.join(__dirname, `mongo.conf`),
        required: false,
        message: path.join(__dirname, `templates/error/mongo.error`),
    },
    app_config: {
        verb: `authorized_apps`,
        method: methods.import,
        default: {},
        file: path.join(__dirname, `apps.conf`),
        required: false,
        message: path.join(__dirname, `templates/error/apps.error`),
    }
};


files.foreach((elem, idx) => {

    if (fs.existsSync(elem.file)) {
        exports[elem.verb] = (elem.method) ? fs.readFileSync(elem.file, "utf8") : require(elem.file, "utf8");
        c_log(`\n✔✔\tSuccessfully loaded the ${elem.verb} configuration.`.succ);
    } else if (elem.required) {
        console.log(`\n❌💣\t🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n\n${require(elem.message, 'utf8')}\n\n❌💣\t🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n`);
        process.exit(0);
    } else {
        c_log(`\n➖\tSkipped loading the ${elem.verb} configuration.`.yell);
    }

});