const express = require("express")
const fs = require("fs")
let router = express.Router()

router.get("*", (req, res) => {
	res.render(req.originalUrl.substring(1), {req: req, res: res})
})

module.exports = router
