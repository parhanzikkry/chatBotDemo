var Sequelize = require(__dirname + '/../dbconnection'),
    Schedules = Sequelize.import(__dirname + '/../models/schedules.model'),
    Books = Sequelize.import(__dirname + '/../models/books.model');

Schedules
    .sync();
Books
    .sync();