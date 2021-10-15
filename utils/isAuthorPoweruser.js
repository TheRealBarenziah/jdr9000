module.exports = (msg) => {
  try {
    const author = String(msg.author.id);
    return String(process.env.POWERUSERS).includes(author) ? true : false;
  }
  catch (e) {
    return false;
  }
};