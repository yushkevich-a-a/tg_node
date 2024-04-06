const listButtons = (list) => {
    return {
        reply_markup: JSON.stringify({
        inline_keyboard: [
          ...list.map( item => ([
            {text: item.name, callback_data: `/get_list ${item.id}` }
        ]))]
        
      })
    }
  }

  const itemButtons = (list) => {
    return {
        reply_markup: JSON.stringify({
        inline_keyboard: [
          ...list.map( item => ([
            {text: item.name, callback_data: item.name },
        ]))]
        
      })
    }
  }
  
module.exports = {
    listButtons,
    itemButtons
}