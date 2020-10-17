require(path.join(__dirname, "connection/index.es6"))(config.sql);

//@ Initialize the database service [instantiates a global [sqldb] as $connection]
require(path.join(__dirname, "query/index.es6"));


//@ Load the express middleware for `n-frame` REST database API integration
///Object.assign( global, { apify : require(path.join(__dirname,'db/index'))(['get','some command'],{},function(){}) } );