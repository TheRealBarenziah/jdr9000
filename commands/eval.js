const evaluate = require("../utils/eval");
const prefix = require("../utils/prefix");

module.exports = {
  name: "eval",
  description: `The nasty 'global.eval()' function in all its glory. Pass code as argument and watch the world burn. It will output return value in chat.
Accepts a single '-p' (public mode) flag BEFORE the code. Can parse as string (\`${prefix}eval 1 + 1\`) or 'js' codeblock as below:
${prefix}eval
\`\`\`js
js = () => "1 + 1";
eval(js());
\`\`\``,
  execute(msg, args) {
    evaluate(msg, args);
    return null;
  },
};
