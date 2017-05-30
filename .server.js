// Imports
const express = require("express")
const fs = require("fs")
const db = require("./db.js")

// Useful functions
console.write = (input) => process.stdout.write(input)

function loadRoute(app, directory, routeFile) {
  console.write("Loading route: " + routeFile + "... ")
  if(fs.existsSync(routeFile)) {
    app.use(directory, require(routeFile))
    console.log("loaded.")
  }
  else {
    console.log("route file not found.")
  }
}

function getDate() {
  let currentDate = new Date()
  return (currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate())
}

let siteStats = db("site-stats.json", {})
siteStats.write = () => {
  fs.writeFile("site-stats.json", JSON.stringify(siteStats), "utf8", (err) => {
    if(err) throw err;
  })
}

//Express app

let app = express()
app.set("view engine", "ejs")
app.set("views", "./")
app.use(express.static("./"))

app.use("*", (req, res, next) => {
  let url = req.originalUrl
  console.write("\nServing: " + url)

  let date = getDate()
  if(siteStats[url] == null) siteStats[url] = {}
  if(siteStats[url][date] == null) siteStats[url][date] = 0
  siteStats[url][date]++;
  siteStats.write()

  next()
})

let siteStatsRouter = express.Router()
siteStatsRouter.get("/", (req, res) => res.send(siteStats))

app.use(       "/api/site-stats", siteStatsRouter)
loadRoute(app, "/api/navyseal",   "./routes/navyseal.js")
loadRoute(app, "/api/webm",       "./routes/webm.js")
loadRoute(app, "/",               "./routes/global.js")

app.use((error, req, res, next) => {
  console.write("... unable to serve.")
  res.status("404")
  res.render("404")
  siteStats[req.originalUrl] = undefined
  siteStats.write()
})

app.listen(3000)
console.log("Web server started, running.")
