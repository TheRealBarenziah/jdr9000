module.exports = {
  name: 'omaewa',
  description: 'Calls the spirit of Hokuto no Ken upon the invoker (or someone else, if you provide a ping as argument).',
  execute(msg, args) {
    if (args.length === 0) {
      msg.channel.send('Omae wa wo shindeiru !', { files: ["https://i.imgflip.com/2kpfci.jpg"] })
        .then(() => msg.reply('Nani ???'))
    }
    else if ((args.length === 1)) {
      if (msg.mentions.users.map(u => u.username).length > 0) {
        msg.channel.send('Omae wa wo shindeiru !', { files: ["https://i.imgflip.com/2kpfci.jpg"] })
          .then(() => msg.channel.send(`${args[0]} Nani ???`)).catch(e => console.error(e))
      }
    }
    else msg.channel.send('I dont take that kind of arguments, only mentions...')
  },
};