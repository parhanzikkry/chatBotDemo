var Sequelize = require(__dirname + '/../dbconnection'),
    SchedulesModel = Sequelize.import(__dirname + '/../models/schedules.model'),
    moment = require('moment');

class Schedules {
    constructor(){}

    GetMyScheduleByDate(data, bot) {
        SchedulesModel
            .findAll({
                where: {
                    id_master: data.id_master,
                    date: data.parameters.date.stringValue,
                },
                attributes: ['description', 'date'],
            })
            .then(result => {
                result = JSON.parse(JSON.stringify(result));
                if(result.length > 0) {
                    for(let i=0; i<result.length; i++) {
                        bot.sendMessage(data.id_master, result[i].description);
                    }
                } else {
                    bot.sendMessage(data.id_master, 'You dont have any schedule on ' + moment(data.parameters.date.stringValue).format('MMMM Do YYYY'));
                }
            })
            .catch(err => {
                // console.log('error :', err);
            });
    }
    
    AddToMySchedules(data) {
        const date = data.parameters.date.stringValue;
        const description =  data.description;
        SchedulesModel
            .create({
                id_master: data.id_master,
                description: description,
                date: date,
            })
            .then(info => {
                // console.log('info :', info);
            })
            .catch(err => {
                // console.log('error :', err);
            });
    }
}

module.exports = new Schedules;