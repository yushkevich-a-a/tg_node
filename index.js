const TelegramBot = require('node-telegram-bot-api');
const {commands} = require('./commands');
const {randomId} = require('./libs');
const { listButtons, itemButtons } = require("./options")

const token = "7046032975:AAF_0v5YO5-zUILUHIBEeLjtns0vb66rk7I";

const bot = new TelegramBot(token, {polling: true});

const listlist = [
  {name: 'список подарков', id: randomId(), data: [
    {name: "лобзик", id: randomId(), currentValue: 6000, link: 'any'}
  ]},
  {name: 'список необходимых покупок', id: randomId(), data: []},
];

const bootstrap = () => {
  bot.setMyCommands([...commands])
  
    bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const message = msg.text;
    
  
      if ( message === '/start' ) {
        await bot.sendSticker(chatId, "https://chpic.su/_data/stickers/t/textlessvanilla/textlessvanilla_010.webp?v=1705169105")
        await bot.sendMessage(chatId, `Бот создания списков покупок(чтобы не забыть)`);
        return;
      }  
  
      if (message === '/info') {
        await bot.sendMessage(chatId, JSON.stringify(msg));
        return
      }


      if (message === '/add_list') {
        const namePrompt = await bot.sendMessage(chatId, "Введите название нового списка?", {
          reply_markup: {
              force_reply: true,
          },
        });
        bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
            const name = nameMsg.text;
            listlist.push({name, id: randomId(), data: []});
             await bot.sendMessage(msg.chat.id, `Новый список ${name} создан!`);
        });
        return;
      }

      if (message === '/all_lists') {
        if (listlist.length === 0) {
          await bot.sendMessage(chatId, "нет списков покупок");
        } else {

          const data = listButtons(listlist);
          await bot.sendMessage(chatId,  "Доступные списки", data);
        }
        return
      }

      if (message === '/delete_list') {

        const namePrompt = await bot.sendMessage(chatId, "Введите название списка который хотите удалить?", {
          reply_markup: {
              force_reply: true,
          },
        });
        bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
            const name = nameMsg.text;
            listlist.push(name);
             await bot.sendMessage(msg.chat.id, `Новый список ${name} создан!`);
             return;
        });
        return;
      }

    });


    bot.on("callback_query", async (msg) => {
      const chatId = msg.message.chat.id;
      const data =  msg.data
      // const message = msg.text;
      if (data.includes('/get_list')) {
          const id = +data.split(' ')[1];
          const currentList = listlist.find(item => item.id === id);
          if (!currentList ) {

            await bot.sendMessage(chatId, "нет такого списка");
          } else {
            
            await bot.sendMessage(chatId, "назавание списка: " + currentList.name,  itemButtons(currentList.data));
          }
        return
      }
    })

    // bot.command()
}

bootstrap();
