const fs = require("fs")
const sql = require("./sql.js")
const htmljs = {
	parse: (path) => {

		let output = fs.readFileSync(path, "utf8")
		let currentScript = ""
		let currentPage = ""
		let findingScript = false;

		for(let i = 0; i < output.length; i++) {
			if(output[i] == '<' && output[i+1] == '%') {
				i += 2
				findingScript = true
			}
			if(output[i] == '%' && output[i+1] == '>') {
				findingScript = false
				i += 2

				let functions = {
					write: (o) =>   { currentPage += o },
					require: (o) => { currentPage += htmljs.parse(o) }
				}

				try {
					Function("document", "sql", currentScript)(functions, sql)
				} catch(e) {
					console.error("Error executing script in " + path + ":")
					console.error(e)
				}

				currentScript = ""
			}

			if(findingScript)
				currentScript += output[i]
			else
				currentPage += output[i]
		}
		return currentPage
	}
}

module.exports = htmljs