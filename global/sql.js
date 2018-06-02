const fs = require("fs")
const sqlSync = new (require("sync-mysql"))(JSON.parse(fs.readFileSync("./sql-credentials.txt")))
const sqlAsync = require("mysql").createConnection(JSON.parse(fs.readFileSync("./sql-credentials.txt")))

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
	},
	mysql: sqlAsync
}
module.exports = sql
