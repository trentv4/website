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
					require: (o) => { currentPage += htmljs.parse(o)},
					article: (articleContents, directory, title) => {
						// Usage: <% document.article(`<content>`, "projects/academia")
						let template = htmljs.parse("global/article-template.htmljs")
						template = template.replace(/%%%title%%%/g, title)
						template = template.replace(/%%%sidebar%%%/g, htmljs.parse(`${directory}/sidebar.htmljs`))
						let pageData = ""
						let splitInput = articleContents.split("\n")
						for(let i = 0; i < splitInput.length; i++) {
							let line = splitInput[i].replace(/\t/g, "")
							if(line == "") continue;
							line[0] == "<" ? pageData += line : pageData += `<p>${line}</p>`
						}
						template = template.replace(/%%%articleContents%%%/g, pageData)
						currentPage += template
						
					}
				}

				try {
					Function("document", "sql", currentScript)(functions, sql)
				} catch(e) {
					console.error("Error executing script in " + path + ":")
					console.error(e)
				}

				currentScript = ""
			}

			if(findingScript) {
				currentScript += output[i]
			}
			else {
				if(output[i] == null) {
					break
				}
				currentPage += output[i]
			}
		}
		return currentPage
	},
	engine: (path, option, callback) => {
		callback(null, htmljs.parse(path))
	}
}

module.exports = htmljs