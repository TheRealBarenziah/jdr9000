const fs = require("fs");
const path = require("path");
const cuttingEdgeAi = require("../utils/cuttingEdgeAi");
const prefix = require("../utils/prefix");

module.exports = {
<<<<<<< HEAD:commands/gifs.js
  name: "g",
  description: `Display some gifs .\nAvailable commands:\n\`${prefix}g ah`, 
=======
  name: "gif",
  description: `Display some gifs .\nAvailable commands:\n\`${prefix}g ah`,
>>>>>>> 1bf971a9526a1df3b22fc8c95d9afc7a7c62a986:commands/gif.js
  execute(msg, args) {
    const invokerId = msg.author.id;
    const invokerUsername = msg.author.username;
    const invokerHashtag = msg.author.discriminator;

    if (args.length === 0) {
      msg.author.send(`${this.description} `);
    }
    else if (args[0] === "ah") {
<<<<<<< HEAD:commands/gifs.js
      msg.channel.send(file="https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif")
    }  
//msg.channel.send(`Level up! Congratulations ${args[1]}! `, { files: [`${cuttingEdgeAi(args[1])}`] })
            //.catch(e => console.error(e));
}}
=======
      msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif")
        .catch(e => console.error(e));
    }
  }
}


>>>>>>> 1bf971a9526a1df3b22fc8c95d9afc7a7c62a986:commands/gif.js

