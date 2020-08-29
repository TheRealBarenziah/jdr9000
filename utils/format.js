module.exports = {
  stats: (object) => {
    const x = Object.entries(object);
    let output = "";
    for(let i = 0; i < x.length; i++){
      output += `${x[i][0]}: ${JSON.stringify(x[i][1])}\n`;
    }
    return `\`\`\`json\n${output}\`\`\``;
  },
  skills: (object) => {
    const newObject = {
      [object.name]: `Current level: ${object.type === "Commune" ? object.level + "/10" : object.level}. Current experience: ${object.exp}/${object.expToLevelUp}`
    };
    return `\`\`\`json\n${JSON.stringify(newObject)}\`\`\``;
  },
  clfu: (object) => `\`\`\`json\n${JSON.stringify(object)}\`\`\``
};