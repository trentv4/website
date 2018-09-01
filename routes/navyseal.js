let express = require("express")
let router = express.Router()
let sql = require("../global/sql.js")

router.get("/", (req, res) => {
	sql.query("select title,content from navyseal").then(rows => {
		let out = []
		rows.forEach(e => {
			out.push({
				title: e.title,
				content: e.content
			})
		})
		res.send(out)
	}).error(console.error)
})

module.exports = router
