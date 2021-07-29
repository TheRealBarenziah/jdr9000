const prefix = require("../utils/prefix");
const soundsDir = require("../assets/sounds/soundsDir");
const path = require("path");
const GIPHYTOKEN = process.env.GIPHY_API_KEY;
const giphy = require("giphy-api")(GIPHYTOKEN);
const roll = require("../utils/roll");
const axios = require("axios");
const ah = require("../utils/ah");

const randomWord = async () => new Promise((resolve, reject) => {
  return axios.get("https://random-word-api.herokuapp.com/word?number=1&swear=1")
    .then((response) => {
      console.log("response.data : ", response.data);
      if(response.data){
        resolve(String(response.data));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = {
  name: "gif",
  description: `Display some gifs. Some gifs may or may not come with extra fancy features.
  \nAvailable commands:
  \n\`${prefix}gif ah\` (sound included !)
  \n\`${prefix}gif your search\` to search
  \n\`${prefix}gif random\` to random search
  `,

  async execute(msg, args) {
    if (args.length === 0) {
      msg.author.send(`${this.description} `);
      return null;
    }
    else if (args[0] === "ah") {
      //ah(msg);
      msg.channel.send("I am the OG bot BITCH !!! uwu");
    }
    else if (args[0] === "random") {
      const querystring = await randomWord();
      // console.log("querystring : ", querystring)      https://random-word-api.herokuapp.com/word?number=1&swear=1
      console.log("Random word was: ", querystring);
      giphy.random({
        tag: querystring ? querystring : "girl",
        rating: "g"
      },
      function (err, res) {
        // console.log("res", res);
        if (err) return console.error(err);
        // console.log(res.data);
        if (res.data) {
          
          msg.channel.send(file = res.data.image_url);
          return null;
        }
        else  {
          msg.reply("... no result were found :(");
          return null;
        }
      }
      );
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
        if (res.data) {
          if (res.data.length > 1) {
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
