let express = require("express")
let router = express.Router()
let db = require("../db.js")

let sheets = db("sheets", {})
let random_chars = "abcdefghijklmnopqrstuvwxyz0987654321"

router.get("/request", (req, res) => {
    let obj = sheets[req.query.id]
    if(obj == null) {
        res.send("{}")
    } else {
        res.send(obj)
    }
})

router.post("/update", (req, res) => {
    sheets[req.body.id] = req.body
    res.end()
})

router.get("/new-id", (req, res) => {
    let s = ""
    do {
        for(let i = 0; i < 6; i++) {
            s += random_chars[Math.floor(Math.random()*random_chars.length)]
        }
    } while(sheets[s] != null)

    res.send(s)
})

module.exports = router
