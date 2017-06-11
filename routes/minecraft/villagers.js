let express = require("express")
let router = express.Router()

let villagers = [
    "b3cea104-fd35-4a5d-bb7b-00668f133e28",
    "1454841b-ba54-4071-80c0-5b51c2f2d25d",
    "af63c94d-5dbe-4a34-b779-3d44fd9edb2a",
    "cbd1f8e6-3501-4918-8a1c-4610a2d7d478",
    "5046ff0c-8e31-4705-9f09-521b29e99878",
    "f37f4fe1-e3ca-40b5-946f-fd66eefee179",
    "117de7ec-f75a-4d1f-9a8b-20e1f1b642ae",
    "ff65ca82-f788-4308-96ad-ce2e5c513d6f",
    "85ee97a4-0d2c-4221-b152-baea5fb8201c",
    "a2ff5ed5-81c5-4c5a-a22e-a16403c6eb79",
    "88419b6a-c0f5-451c-913c-57e111d9a07c",
    "7b794048-f144-40bb-83dd-4789a5cf7cc8",
    "6989aa02-f8d0-4845-b205-2ba37b55c954",
    "eb21559e-bb22-46f2-897b-71eee2d5c09b",
    "6c249311-f939-4e66-9f31-49b753bfb14b",
    "08b91900-f0ee-4745-ba0f-15d3cc933660"
]

router.get("/", (req, res) => {
  res.send(villagers)
})

module.exports = router
