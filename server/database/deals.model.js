const db = require('./db_connection');
const queries = require('./db_queries');

class Deal {
    constructor(args) {
        this.id = args.id;
        this.title = args.title;
        this.description = args.description;
        this.venue = args.venue;
        this.location = args.location;
        this.resultsCallback = args.resultsCallback;

    }

    /*
    *
    * Retrieve a single deal from the database
    * This requires the deal class to be initialised with at least a deal title
    *
    */
    retrieve() {
        const sanitisedQuery = queries.sanitiseQuery('SELECT * FROM MEALDEALS.DEALS WHERE ?', this.title);
        db.getConnection(conn => {
            conn.query(sanitisedQuery, (err, result, fields) => {
                this.resultsCallback(result);
            });
        });
    }

}

export default Deal;