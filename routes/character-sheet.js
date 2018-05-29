let express = require("express")
let router = express.Router()
let db = require("../db.js")

let random_chars = "abcdefghijklmnopqrstuvwxyz0987654321"

router.get("/request", (req, res) => {

})

router.post("/update", (req, res) => {

})

router.get("/new-id", (req, res) => {
    let s = ""
    do {
        for(let i = 0; i < 10; i++) {
            s += random_chars[Math.floor(Math.random()*random_chars.length)]
        }
    } while(sheets[s] != null)

    res.send(s)
})

module.exports = router
