let express = require("express")
let router = express.Router()
let db = require("../db.js")

let webm = db("data", {webm: []}).webm

router.get("/all", (req, res) => {
  res.send(webm)
})

router.get("/request", (req, res) => {
  if(req.query.v != "")
	{
		var found = false;
		for(var i = 0; i < webm.length; i++)
		{
			if(webm[i].name == (req.query.v))
			{
				res.send(webm[i]);
				res.end();
				found = true;
			}
		}
		if(found == false)
		{
			res.send({name: "Unavailable", path:"", tags:[]});
			res.end();
		}
	}
	else
	{
		res.end()
	}
})

module.exports = router
