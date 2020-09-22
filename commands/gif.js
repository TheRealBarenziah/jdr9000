const prefix = require("../utils/prefix");
const soundsDir = require("../assets/sounds/soundsDir");
const path = require("path");
const GIPHYTOKEN = process.env.GIPHY_API_KEY;
const giphy = require("giphy-api")(GIPHYTOKEN);
const roll = require("../utils/roll");

module.exports = {
  name: "gif",
  description: `Display some gifs. Some gifs may or may not come with extra fancy features.\nAvailable commands:\n\`${prefix}gif ah`,

  execute(msg, args) {
    if (args.length === 0) {
      msg.author.send(`${this.description} `);
      return null;
    }
    else if (args[0] === "ah") {
      const voiceChannel = msg.member.voiceChannel;
      if (voiceChannel) {
        voiceChannel.join()
          .then(connection => {
            const dispatcher = connection.playFile(path.join(soundsDir, "ah.wav"), { volume: 0.6 });
            msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif");
            dispatcher.on("end", () => {
              voiceChannel.leave();
            });
          })
          .catch(e => console.error(e));
        return null;
      }
      else {
        msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif");
        return null;
      }
    }

    else {
      const querystring = args.join().replace(/,/g, " ");
      // console.log("querystring : ", querystring);
      return giphy.search({
        q: querystring,
        rating: "r",
        limit: 8
        /*
        ,fmt: "json"
        */
      }, function (err, res) {
        // console.log("res", res);
        if (err) return console.error(err);
        // console.log(res.data);
        if(res.data){
          if(res.data.length > 1){
            const randomized = roll(res.data.length) - 1;
            msg.channel.send(file = res.data[randomized].url);
            return null;
          }
          else if (res.data[0]) {
            msg.channel.send(file = res.data[0].url);
            return null;
          }
          else if (typeof res.data[0] === "undefined") {
            msg.reply("... no result were found :(");
            return null;
          }
        }
        else {
          msg.reply("fokoff modafoka i didnt find ur shit!");
          return null;
        }
      });
    }
  }
};
