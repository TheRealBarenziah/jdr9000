module.exports = {
  stats: (object) => `\`\`\`json\n${JSON.stringify(object).split("},").map(str => `${str}\n`)}\`\`\``
};