const crypto = require("crypto")
const sql = require("../global/sql.js")
const fs = require("fs")

let express = require("express")
let router = express.Router()

let credentials = [{username: "trentv4", password: "orCFZaiZMS4L5n+u4n1Dy2w7xM2H5KoSaZdoeT1LbFs="}]

function isValidUser(username, password) {
	let hashedPassword = crypto.createHash('sha256').update(password).digest('base64')
	for(let i = 0; i < credentials.length; i++) {
		if(username == credentials[i].username && hashedPassword == credentials[i].password) {
			return true
		}
	}
	console.write("... not authorized.")
	return false
}

router.post("/forbid", (req, res) => {
	if(!isValidUser(req.body.username, req.body.password)) return
	let page = sql.mysql.escape(unescape(req.body.page))

	sql.query("insert into forbidden (page) values ("+ page +")").then(rows => {
		sql.query("update traffic set state='forbidden' where page="+ page).then(rows => {
			console.write("... forbidding " + page)
			res.status("200")
			res.send("Forbid " + page)
			res.end()
		})
	})
})

router.post("/delete", (req, res) => {
	if(!isValidUser(req.body.username, req.body.password)) return
	let page = sql.mysql.escape(unescape(req.body.page))

	sql.query("delete from traffic where page="+ page).then(rows => {
		console.write("... deleting " + page)
		res.status("200")
		res.send("Deleted " + page)
		res.end()
	})
})

router.post("/allow", (req, res) => {
	if(!isValidUser(req.body.username, req.body.password)) return
	let page = sql.mysql.escape(unescape(req.body.page))

	sql.query("delete from forbidden where page="+ page).then(rows => {
		let url = "." + page.substring(1, page.length-1)
		let state = "valid"
		if(fs.existsSync(url) && fs.statSync(url).isFile()) {
			state = "file"
		} else if(url != "./") {
			state = "missing"
		}
		console.log(state)
		sql.query("update traffic set state='"+ state +"' where page="+ page).then(rows => {
			console.write("... allowing " + page)
			res.status("200")
			res.send("Allowed " + page)
			res.end()
		})
	})

})

module.exports = router
