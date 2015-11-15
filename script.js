function httpGet(theUrl)
{
	try
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", theUrl, true);
	    xmlHttp.send();
	    return xmlHttp.responseText;
	} catch (err)
	{
		return "Unable to load file";
	}
}

console.log(httpGet("http://google.com"))