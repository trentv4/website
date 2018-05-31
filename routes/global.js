const express = require("express")
const fs = require("fs")
let router = express.Router()

router.get("*", (req, res) => {
	let url = req.originalUrl.substring(1)
	if(fs.existsSync(url + ".htmljs")) url += ".htmljs"
	res.render(url, {req: req, res: res})
})

module.exports = router
