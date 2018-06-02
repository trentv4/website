const fs = require("fs")
let sqlSync, sqlAsync
try {
sqlSync = new (require("sync-mysql"))(JSON.parse(fs.readFileSync("./sql-credentials.txt")))
sqlAsync = require("mysql").createConnection(JSON.parse(fs.readFileSync("./sql-credentials.txt")))

} catch(e)
{
	console.log(e)
}

let sql = {
	querySync: (i) => {
		return sqlSync.query(i)
	},
	query: (i) => {
		return new Promise((resolve, reject) => {
			sqlAsync.query(i, (e, rows, fields) => {
				resolve(rows)
			})
		})
	}
}
module.exports = sql
