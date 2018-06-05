function send(action, pageUrl) {
	localStorage.setItem("un", document.getElementById("un").value)
	localStorage.setItem("pw", document.getElementById("pw").value)
	let request = new XMLHttpRequest()
	request.open("POST", action)
	// forbid delete allow

	request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	let data = {
		page: pageUrl, 
		username: ""+document.getElementById("un").value, 
		password: ""+document.getElementById("pw").value
	}
	console.log(JSON.stringify(data))
	request.send(JSON.stringify(data))

	request = new XMLHttpRequest()
	request.open("GET", "/api/reload-forbidden")
	request.send()
}

document.getElementById("un").value = localStorage.getItem("un")
document.getElementById("pw").value = localStorage.getItem("pw")