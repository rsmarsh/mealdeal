const dbCredentials = {
    host:  process.env.DB_HOST || "HOSTNAME",
    databaseName: process.env.DB_NAME || "DB_NAME",
    user: process.env.DB_USER || "DBUSERNAME",
    password: process.env.DB_USER || "DBPASSWORD"
};

module.exports =  dbCredentials; 