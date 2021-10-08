module.exports = (msg) => {
  try {
    const author = msg.author.id;
    const allowedCallers = Array.from(process.env.POWERUSERS).join("");
    return allowedCallers.includes(author) ? true : false;
  }
  catch (e) {
    return false;
  }
};