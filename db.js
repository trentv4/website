let fs = require("fs")

function db(file, defaultObject) {
  let obj = defaultObject
  if(fs.existsSync(file)) {
    obj = JSON.parse(fs.readFileSync(file, "utf-8"))
  }
  return obj
}

module.exports = db
