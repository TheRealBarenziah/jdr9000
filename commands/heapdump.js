const heapdump = require("heapdump");
const path = require("path");

module.exports = {
  name: "heapdump",
  description: "Only works if `NODE_ENV=DEVELOPMENT`. Pass `!` as argument to write a heapsnapshot into the ./heapdumps folder. Pass `gc` as argument to manually call the garbage collector (only works if environment variable `NODE_ENV` equals `development`)",
  execute(msg, args) {
    if (process.env.NODE_ENV === "development") {

      if ((args.length === 1) && (args[0] === "!")) {
        heapdump.writeSnapshot(path.join(__dirname, `../heapdumps/${process.env.HOSTNAME}.${Date.now()}.heapsnapshot`));
      }
      else if ((args.length === 1) && (args[0] === "gc")) {
        console.log("Proc garbage collector");
        global.gc();
      }
      else if ((args.length === 1) && (args[0] === "env")) {
        msg.author.send(`My environment is currently set to '${process.env.NODE_ENV}'`);
      }
    }
  }
};
