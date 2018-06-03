let express = require("express")
let router = express.Router()
let sql = require("../global/sql.js")

router.get("/", (req, res) => {
	sql.query("select title,content from navyseal").then(rows => {
		res.send(rows)
	})
})

module.exports = router
