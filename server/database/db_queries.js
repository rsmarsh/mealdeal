let dbConnection = require('./db_connection.js');
let mysql = require('mysql');

// For database table inserts, an object containing a "table" property is required, followed by key/values of column names and insert values
let dbInsert = function (insertsObj, callback) {
    if (!insertsObj.table) {
        return console.error("No table name specified in the insert object");
    }

    // prepare break the inserts object down into two arrays of column names and the values to insert into them
    let columns = [];
    let values = [];

    // iterate over the provided object, gathering all defined values
    for (let column in insertsObj) {
        // the table value needs to remain seperate so it can be added as the first value of the escaped query
        if (insertsObj[column] !== undefined && column !== 'table') {
            columns.push(column);
            values.push(insertsObj[column]);
        }
    }

    // map the column names and the values into comma seperated strings containing  '??' or '?'
    let query = 'INSERT INTO MEALDEALS.?? (' +
        columns.map((c) => '??').join(', ')
        + ') VALUES (' +
        values.map((v) => '?').join(', ')
        + ')';

    // add all '??'/'?' replacement values to an array ithe order matching the query structure [table name, columns, values]
    let insertValues = [insertsObj.table].concat(columns, values);
    let escapedQuery = sanitiseQuery(query, insertValues);

    // run the insert statement using the returned open connection
    dbConnection.getConnection((conn) => {
        runQuery(conn, escapedQuery, callback);
    });
};

// Allows a select statement to be run
// Options to be provided are Strings for 'select', 'from', 'where' and 'equals'
let dbSelect = function (selectObj, callback) {
    //destructure object into an array, required to be safely inserted and escaped within the query
    let inserts = [selectObj.select, selectObj.from, selectObj.where, '%'+selectObj.equals+'%'];
    if (inserts.includes(undefined)) {
        console.error("Select statement missing required inserts:");
        return console.log(selectObj);
    }

    // predefined simple select query allowing a few custom ids and values
    let query = "SELECT ?? from MEALDEALS.?? WHERE ?? LIKE ?";
    let escapedQuery = sanitiseQuery(query, inserts);

    dbConnection.getConnection((conn) => {
        runQuery(conn, escapedQuery, callback);
    });
};

// intended for removing rows from a table
let dbDelete = function (deleteObj, callback) {
    let query = "DELETE FROM MEALDEALS.?? WHERE ?? ";
    if (typeof deleteObj.equals === 'string') {
        query += '= ?';
    } else if (Array.isArray(deleteObj.equals)) {
        // if the array is of length 1, process it as an '='
        // otherwise if deleting multiple rows, then the IN keyword is required,
        // and the values must be mapped and output as a comma seperated string of ?'s
        deleteObj.length === 1 ?
            query += '= ?' :
            query += ' IN ('+deleteObj.equals.map((val) => '?').join(',')+')'
    } else {
        return console.error("delete statement 'equals' contains an invalid value");
    }

    let inserts = [deleteObj.from, deleteObj.where].concat(deleteObj.equals);
    if (inserts.includes(undefined)) {
        console.error("Delete statement missing required values:");
        return console.log(deleteObj);
    }

    let escapedQuery = sanitiseQuery(query, inserts);
    
    dbConnection.getConnection((conn) => {
        runQuery(conn, escapedQuery, callback);
    });
};

let dbUpdate = function (updateObj) {
    console.error("update query not yet implemented");
};

// checks for and escapes any dangerous statements and injection attempts
let sanitiseQuery = function (query, inserts) {
    return mysql.format(query, inserts);
};

// Receives an pre-escaped SQL query, along with an open database connection
let runQuery = function (conn, query, callback) {
    if (!conn) {
        return console.error("Issue retrieving an open Database connection from the pool");
    }

    conn.query(query, (err, results, fields) => {
        // close the connection as early as possible once the query has completed
        dbConnection.endConnection(conn);
        if (err) {
            throw err;
        }
        // outputQueryResult(results);

        // if the front-end requires these results back, pass them into the callback here
        if (callback) {
            callback(results);
        }
    });

};

// Prints the query results to the NodeJS console
let outputQueryResult = function (results) {
    console.log("query results are:");
    console.log(results);
};

module.exports = {
    dbInsert: dbInsert,
    dbSelect: dbSelect,
    dbDelete: dbDelete
};