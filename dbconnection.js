var Sequelize = require('sequelize');
const config = require(__dirname + '/config');

module.exports = new Sequelize(config.DB.database/*DB name*/, config.DB.username/*DB username*/, config.DB.password/*DB password*/, {
	host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: 'mysql'/*type of DBMS*/,
    port: 3306,

	pool: {
		/*Set max requesting to database*/
		max: 100,
		min: 0,
		idle: 30000,
		acquire: 10000
	},
	/*Set timezone to DB*/
	timezone: '+07:00',
	logging: false
});