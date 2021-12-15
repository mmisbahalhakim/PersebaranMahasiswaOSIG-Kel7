var developmentDatabase = {
    postgres: {
    host: 'ec2-52-201-195-11.compute-1.amazonaws.com',
    port: 5432,
    database: 'd7uvpspcatq4uu',
    user: 'ikgpqoxhanfsmh',
    password: 'a5a2dc8163b8fad65f2b3790d916cc401b57287b3b19df9ef2e0dfa8f1752d45'
    }
    }
    
    var connectionString ="ikgpqoxhanfsmh:a5a2dc8163b8fad65f2b3790d916cc401b57287b3b19df9ef2e0dfa8f1752d45@ec2-52-201-195-11.compute-1.amazonaws.com:5432/d7uvpspcatq4uu?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }