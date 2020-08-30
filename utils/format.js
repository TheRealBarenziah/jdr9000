const capitalize = require("./capitalizeFirstChar");

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
  clfuObject: (object) => {
    const {command, summary} = {...object};
    const prettySummary = capitalize(summary); // capitalize first letter
    return `\`${command}\`\n*${prettySummary}*`;
  },
  clfuArray: (array) => {
    let output = "";
    for(let i = 0; i < array.length; i++){
      const {command, summary} = {...array[i]};
      const prettySummary = capitalize(summary);
      console.log("prettySummary len ? ", prettySummary.length);
      output.length < 1800 ? output += `\`${command}\`\n*${prettySummary}*\n\n` : null;
    }
    return output;
  }
};