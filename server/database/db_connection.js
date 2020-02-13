const credentials = require('../credentials/database.json');
const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 10,
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.databaseName 
});

// Open a connection from the pool
// The connection is passed cos the provided callback function
let getConnection = function(cb){
    if (!cb) {
        return console.error("getConnection called without callback");
    }
    //request a free connection from the pool
    pool.getConnection((err, conn) => {
        //pass false to the callback, allowing it to handle the error gracefully
        if (err) {
            cb(false);
            throw err;
        }
        // pass the open connection to the provided callback
        cb(conn);
    });
};

let endConnection = function(connection) {
    if (!connection) {
        return console.error('endConnection requires a connection as a parameter');
    } 
    connection.release();
};

// closes all active DB connections from the pool
let closeActiveConnections = function() {
    pool.end((err) => {
        if (err) throw err;
    });
}

module.exports = {
    getConnection: getConnection,
    endConnection: endConnection
};