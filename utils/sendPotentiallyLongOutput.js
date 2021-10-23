module.exports = ({ string, msg, styleCb = null }) => {
  if (string.length < 1988) {
    msg.channel.send(styleCb ? styleCb(string) : string);
  }
  else {
    const buf = Buffer.from(string, "utf-8");
    msg.channel.send("Full output below:", { files: [{ attachment: buf, name: "output.txt" }] });
  }
  return null;
};