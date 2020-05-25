module.exports = {
  stats: (object) => `\`\`\`json\n${JSON.stringify(object).split("},").map(str => str.charAt(0) === "{" ? `${str.substr(1)}\n` : `${str}\n`)}\`\`\``
};