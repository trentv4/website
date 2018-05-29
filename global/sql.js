const sql = require("mysql")
const fs = require("fs")

const connection = sql.createConnection(JSON.parse(fs.readFileSync("./sql-credentials.txt")))

connection.connect((err) => {
	if(err)
	{
		console.log(err)
		return;
	}
	console.log("Connected to MariaDB") 
})

module.exports = connection