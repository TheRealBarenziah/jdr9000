const capitalize = require("./capitalizeFirstChar");

module.exports = {
  stats: (object) => {
    const x = Object.entries(object);
    let output = "";
    for (let i = 0; i < x.length; i++) {
      output += `${x[i][0]}: ${JSON.stringify(x[i][1])}\n`;
    }
    return this.orange(output);
  },
  skills: (object) => {
    const newObject = {
      [object.name]: `Current level: ${object.type === "Commune" ? object.level + "/10" : object.level}. Current experience: ${object.exp}/${object.expToLevelUp}`
    };
    return `\`\`\`json\n${JSON.stringify(newObject)}\`\`\``;
  },
  dices: (successDiceArray, failedDiceArray) => {
    let output = `+ ${successDiceArray}\nNombre de dés réussis: ${successDiceArray.length}\n- ${failedDiceArray}\nNombre de dés ratés: ${failedDiceArray.length}`;
    return `\`\`\`diff\n${output}\`\`\``;
  },
  clfuObject: (object) => {
    const { command, summary } = { ...object };
    const prettySummary = capitalize(summary); // capitalize first letter
    return `\`${command}\`\n*${prettySummary}*`;
  },
  clfuArray: (array) => {
    let output1 = "";
    let output2 = "";
    let output3 = "";
    for (let i = 0; i < array.length; i++) {
      const { command, summary } = { ...array[i] };
      if (!summary) {
        break;
      }
      const prettySummary = capitalize(summary);
      // very dumb code, but three chunks (~6000 characters) should be enough to cover most cases
      if (output1.length < 1800) {
        output1 += `\`${command}\`\n*${prettySummary}*\n`;
      }
      else if (output2.length < 1800) {
        output2 += `\`${command}\`\n*${prettySummary}*\n`;
      }
      else if (output3.length < 1800) {
        output3 += `\`${command}\`\n*${prettySummary}*\n`;
      }
    }
    return {
      output1: output1,
      output2: output2,
      output3: output3
    };
  },
  orange: (string) => `\`\`\`fix\n${string}\`\`\``,
  json: (string) => `\`\`\`json\n${string}\`\`\``,
  bash: (string) => `\`\`\`bash\n${string}\`\`\``,
};