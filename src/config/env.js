

const env = {
    database: "DEXAGROUP",
    username: "root",
    password: "gratia10",
    port: 3306,
    host: "127.0.0.1",
    dialect:'mysql',
    // ssl:true,
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
}


module.exports = env;

