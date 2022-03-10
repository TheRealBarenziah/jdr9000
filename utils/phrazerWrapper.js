/* ESM stands for ECMA SADOMASOCHISM !!!!

I'm NOT! rewriting my stuff in MJS. Don't even mention TypeScript (ง ͡ʘ ͜ʖ ͡ʘ)ง

Let's just spawn a child process (while praying Satan & cursing nodejs .esm libs) and let him die as the tainted, sinner child he is.

I'll keep my hand clean & use require, thank you very much.

This hateful message is sponsored by "MUH REQUIRE FOREVER" gang.
*/



/* Well, after a good night & a few bowls of fresh air.

I took a new take on this and ended making a PR for phraze ( https://github.com/Serjeel-Ranjan-911/ASCII-Art-Cartoon-CLI/pull/1 )

Computers are only obeying orders afterall. And node.js (& V8) is still one of the 7 modern world wonders. Hate is the dark side.

But obviously the light side (TC39 + the great minds that contribute to node.js) couldn't ignore this module interops issue.

...

await import() goes brrrr.

I'm still a Old Gods (require) believer, but I'm now slightly (~2%) more tolerant of the 'ESM only' module authors. 🤺

*/

const util = require("util"); // CULTURED require call. Admire how it just works !!!!!
const exec = util.promisify(require("child_process").exec); // promise me to REQUIRE baby!! mmmmh yea feels GOOD (و ˃̵ᴗ˂̵)و
const prettify = require("../utils/format").bash; // another -cultured- require call.
const sendPotentiallyLongOutput = require("../utils/sendPotentiallyLongOutput"); // such require much culture wow !!!

// below a cultured, S T A N D A R D module.export: oh f*ck yea spread it ୧⍢⃝୨
module.exports = async (string, msg, optionalArg = "homer") => { 
  try {
		const phraze = async (string, optionalArg) => {
				return await import("phraze").then(async module => {
			console.log("obtw module ? ", await module.phraze)
			return await module.phraze(string, optionalArg, true)
			.catch(e => console.log("e in .then"))
		})
		} 
    const result = await phraze(string, optionalArg)
      .catch(e => {
        sendPotentiallyLongOutput({ string: String(e), msg, styleCb: (x) => prettify(x) });
      });
    if (result) {
      sendPotentiallyLongOutput({ string: result, msg, styleCb: (x) => prettify(x) });
    }
  } catch (error) {
		console.log("Oopsie! Error in phrazerWrapper 53", error)
    msg.channel.send("Error while exec'ing phrazer:", prettify(error));
  }
};