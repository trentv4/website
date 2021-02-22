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
					article: (articleContents, directory, title, showTableOfContents) => {
						// Usage: <% document.article(`<content>`, "projects/academia")
						if(showTableOfContents == undefined) showTableOfContents = true
						let template = htmljs.parse("global/article-template.htmljs")
						template = template.replace(/%%%title%%%/g, title)
						template = template.replace(/%%%sidebarL%%%/g, htmljs.parse(`${directory}/sidebar.htmljs`))
						let pageData = ""
						let splitInput = articleContents.split("\n")
						let hrefs = []
						for(let i = 0; i < splitInput.length; i++) {
							let line = splitInput[i].replace(/\t/g, "")
							if(line == "") continue;
							if(line.includes("<h2>") && showTableOfContents) {
								let header = line.replace(/<h2>|<\/h2>/g, "")
								line = line.replace(/<h2>/g, `<h2 id='${header}'>`)
								hrefs.push(header)
							}
							if(line.includes("<h1>") && showTableOfContents) {
								let header = line.replace(/<h1>|<\/h1>/g, "")
								line = line.replace(/<h1>/g, `<h1 id='${header}'>`)
								hrefs.push(`<b>${header}</b>`)
							}
							line[0] == "<" ? pageData += line : pageData += `<p>${line}</p>`
						}
						template = template.replace(/%%%articleContents%%%/g, pageData)
						let sidebarR = ``
						if(hrefs.length > 1 && showTableOfContents) {
							let h2List = `<div id="sidebar">
							              <li>Table of Contents</li>
							              <hr>
							              <li><a href="#header">Top</a></li>
							              `
							for(let i = 0; i < hrefs.length; i++) {
								h2List += `<li><a href="#${hrefs[i].replace(/<b>|<\/b>/g, "")}">${hrefs[i]}</a></li>`
							}
							sidebarR = `${h2List}</div>`
						}
						template = template.replace(/%%%sidebarR%%%/g, sidebarR)
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