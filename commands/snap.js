const heapdump = require("heapdump");

module.exports = {
  name: "heapdump",
  description: "01000110 01010101",
  execute(msg, args) {
    if ((args.length === 1) && (args[0] === "!")) {
      heapdump.writeSnapshot(`/home/snotrq/Code/jdr9000/dumps/${Date.now()}.heapsnapshot`);
      heapdump.writeSnapshot((e, fileName) =>{
        if(e) console.error(e);
        console.log(`Dump written to ${fileName}`);
      });
    }
    else if ((args.length === 1) && (args[0] === "gc")) {
      console.log("Proc garbage collector");
      global.gc();
    }
  }
};