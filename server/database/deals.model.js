const db = require('./db_connection');
const queries = require('./db_queries');

class Deal {
    constructor(args) {

        // The currently supported deal attributes
        this.dealAttributes = {
            id: args.id,
            title: args.title,
            description: args.description,
            venue: args.venue,
            location: args.location
        };

        this.resultsCallback = args.resultsCallback;

    }

    /**
     * This function validates the current Deal object against a list of required values
     * @param {Array} requiredFields - an array of string values which need to be present within this deal 
     */
    validateDeal(requiredFields) {
        let dealValid = true;
        
        requiredFields.forEach(field => {
            if (typeof this.dealAttributes[field] === 'undefined') {
                dealValid = false;
            }
        });

        return dealValid;
    }

    /**
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

    /**
     * Insert a new deal into the database
     * Report back to the callback with the newly created row
     */
    insert() {
        const requiredFields = ['title', 'description', 'venue', 'location'];
        const dealValid = this.validateDeal(requiredFields);

        if (!dealValid) {
            this.resultsCallback(false);
        }

        queries.dbInsert({
            table: 'Deals',
            ...this.dealAttributes
        }, (res) => {
            console.log("returned from doing dbInsert with the following:");
            console.log(res);
            this.resultsCallback(res);
        });

    }


}

module.exports = Deal;