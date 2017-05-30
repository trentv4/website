let express = require("express")
let router = express.Router()
let db = require("../db.js")

let navyseal = db("data", {navyseal: []}).navyseal

router.get("/", (req, res) => {
  res.send(navyseal)
})

module.exports = router
