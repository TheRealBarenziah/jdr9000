/* ESM stands for ECMA SADOMASOCHISM !!!!

I'm NOT! rewriting phrazer library in CJS. Don't even mention TypeScript (ง ͡ʘ ͜ʖ ͡ʘ)ง

Let's just spawn a child process (while praying Satan & cursing nodejs .esm libs) and let him die as the tainted, sinner child he is.

I'll keep my hand clean & use require, thank you very much.

This hateful message is sponsored by "MUH REQUIRE, FOREVER" gang.
*/

const util = require("util"); // CULTURED require call. Admire how it just works !!!!!
const exec = util.promisify(require("child_process").exec); // promise me to REQUIRE baby!! mmmmh yea feels GOOD (و ˃̵ᴗ˂̵)و
const prettify = require("../utils/format").bash; // another cultured require call.
const sendPotentiallyLongOutput = require("../utils/sendPotentiallyLongOutput"); // such require much culture wow !!!

// below a cultured, S T A N D A R D module.export. F*ck yea spread it ୧⍢⃝୨
module.exports = async (string, msg, optionalArg = "homer") => { 
  // console.log("obtw cat node_modules/phraze/cli.js in phrazerWrapper ", await exec("cat node_modules/phraze/cli.js"));
  //console.log("just in case a clg : ",  await exec("node -v"));
  try {
    const qs = `node ./node_modules/phraze/cli.js "${string}" ${optionalArg}`;
    console.log("qs in phrazerWrapper: ", qs);
    const result = await exec(String(qs)).then(res => {
      console.log("im in yr THEN ", res);
      return res;
    })
      .catch(e => {
        console.log("im in yr CATCH", e);
        sendPotentiallyLongOutput({ string: String(e), msg, styleCb: (x) => prettify(x) });
      });
    if (result) {
      console.log("im in yr IF RESULT ", result);
      const output = result.stdout ? result.stdout : result.stderr ? result.stderr : "no output";
      sendPotentiallyLongOutput({ string: output, msg, styleCb: (x) => prettify(x) });
    }
    else{
      console.log("ELSE NOR ESULT NANINANI ");
    }
  } catch (error) {
    msg.channel.send("Error while exec'ing phrazer:", prettify(error));
  }
  
};