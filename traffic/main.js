function send(action, page) {
	console.log(action, page)
	return
	let request = new XMLHttpRequest()
	request.open("get", "/api/navyseal/", true)

	request.onreadystatechange = () => {
		if(request.readyState == 4 & request.status == 200)
		{

		}
	}
	request.setRequestHeader('Content-type', 'application/json');
	request.send()
}