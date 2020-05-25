module.exports = {
  stats: (object) => {
		const x = Object.entries(object)
		let output = "";
		for(let i = 0; i < x.length; i++){
			output += `${x[i][0]}: ${JSON.stringify(x[i][1])}\n`
		}
		return `\`\`\`json\n${output}\`\`\``
	}
};