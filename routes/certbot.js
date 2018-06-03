let express = require("express")
let router = express.Router()

router.get("/", (req, res) => {
	console.log("failure")
})

module.exports = router
