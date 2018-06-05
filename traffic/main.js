function send(action, pageUrl) {
	localStorage.setItem("un", document.getElementById("un").value)
	localStorage.setItem("pw", document.getElementById("pw").value)
	let request = new XMLHttpRequest()
	request.open("POST", action)
	// forbid delete allow
	let count = 0
	request.onreadystatechange = () => {
		if(request.readyState == 4 && request.status == 200) {
			document.location = document.location + ""
		}
	}

	request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	let data = {
		page: pageUrl, 
		username: ""+document.getElementById("un").value, 
		password: ""+document.getElementById("pw").value
	}
	request.send(JSON.stringify(data))

	request = new XMLHttpRequest()
	request.open("GET", "/api/reload-forbidden")
	request.send()
}

document.getElementById("un").value = localStorage.getItem("un")
document.getElementById("pw").value = localStorage.getItem("pw")
window.scrollTo(0, localStorage.getItem("scrollPosition"))

window.addEventListener("scroll", () => {
	localStorage.setItem("scrollPosition", window.scrollY)
})
