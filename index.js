const TelegramBot = require('node-telegram-bot-api');
const {commands} = require('./commands');
const {randomId} = require('./features/libs');

const token = "7046032975:AAF_0v5YO5-zUILUHIBEeLjtns0vb66rk7I";

const webUrl = 'https://yandex.ru';


const bot = new TelegramBot(token, {polling: true});

const listlist = [
  {name: 'список подарков', id: randomId(), data: [
    {name: "лобзик", id: randomId(), currentValue: 6000, link: 'any'}
  ]},
  {name: 'список необходимых покупок', id: randomId(), data: []},
];

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  if (message === "/start") {
    await bot.sendMessage(chatId, 'ниже появится кнопка, заполни форму', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'отправка формы', web_app: {
            url: webUrl
          }}]
        ]
      }
    });
  }
  
  await bot.sendMessage(chatId, 'received your message');
})
