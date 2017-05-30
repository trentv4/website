let express = require("express")
let router = express.Router()
let db = require("../db.js")

router.get("*", (req, res) => {
  res.render(req._parsedUrl.pathname.substring(1), {req: req, res: res})
})

module.exports = router
