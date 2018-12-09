const Telegram = require('node-telegram-bot-api');
const Dialogflow = require('dialogflow');
const uuid = require('uuid');
const Schedules = require(__dirname + '/controllers/schedules.controller');
const Books = require(__dirname + '/controllers/books.controller');
const config = require(__dirname + '/config');

// set telegram bot
const token = config.telegram.token // token from botFather
const pzp_bot = new Telegram(token, { polling: true });
// set dialogflow access
const projectId = config.dialogflow.agent_name; // my Agent in dialogflow
const sessionId = uuid.v4(); // ganerated random session id
const sessionClient = new Dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

pzp_bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msg.text,
                languageCode: msg.from.language_code,
            },
        },
    };
    // connect to dialogflow to check intent and response
    sessionClient
        .detectIntent(request)
        .then(responses => {
            const result = responses[0].queryResult;
            for(let i=0; i<result.fulfillmentMessages.length; i++) {
                pzp_bot.sendMessage(chatId, result.fulfillmentMessages[i].text.text[0]);
            }
            if(result.action == 'makeschedule') {
                const data = {
                    id_master: chatId,
                    parameters: result.parameters.fields,
                    description: result.fulfillmentMessages[1].text.text[0]
                }
                Schedules.AddToMySchedules(data);
            } else if(result.action == 'checkschedule') {
                const data = {
                    id_master: chatId,
                    parameters: result.parameters.fields,
                }
                Schedules.GetMyScheduleByDate(data, pzp_bot);
            } else if(result.action == "booksave") {
                const data = {
                    id_master: chatId,
                    parameters: result.parameters.fields,
                    description: result.fulfillmentMessages[1].text.text[0],
                }
                Books.AddMyBookList(data);
            } else if(result.action == "checkbook") {
                const data = {
                    id_master: chatId,
                    parameters: result.parameters.fields,
                }
                Books.GetMyBookingByDate(data, pzp_bot);
            }
        })
        .catch(err => {
            console.log('error :', err);
        });
});

