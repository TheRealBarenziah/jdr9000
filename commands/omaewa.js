module.exports = {
	name: 'omaewa',
	description: 'omae wa wo shindeiru!',
	execute(msg, args) {
    if(args.length === 0){
      msg.channel.send('Omae wa wo shindeiru !', {files: ["https://i.imgflip.com/2kpfci.jpg"]}).then(() => msg.reply('Nani ???'))
    }
    else if((args.length === 1)){
      if(msg.mentions.users.map(u => u.username).length > 0){
        const user = msg.mentions.users[0];
        msg.channel.send('Omae wa wo shindeiru !', {files: ["https://i.imgflip.com/2kpfci.jpg"]}).then(() => msg.channel.send(`${args[0]} Nani ???`)).catch(e => console.error(e))
      }
    }
    else msg.channel.send('I dont take that kind of arguments, only mentions...')
	},
};