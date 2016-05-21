var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1yOgfwOgjLeefXId2eBFB1N8G0iZMIvs1Q7jUClnz1S4/pubhtml"
Tabletop.init({
	key: spreadsheetURL,
	callback: showInfo,
	simpleSheet: true
})

var data;
var pastIndex = -1;
var currentIndex;

function showInfo(d, tabletop)
{
	data = d;
	currentIndex = getIndex();
	document.getElementById("card1").innerHTML = getAnswer(currentIndex);
	document.getElementById("card2").innerHTML = getDefinition(currentIndex);
	$("#card").flip();
	document.getElementById("card").style.display = "block"
}

function next()
{
	$("#card").flip();
	currentIndex = getIndex();
	document.getElementById("card1").innerHTML = getAnswer(currentIndex);
	document.getElementById("card2").innerHTML = getDefinition(currentIndex);
}

function getAnswer(number)
{
	var data2 = data[number];
	if(data2.Answer.substring(0,2) == "i/")
	{
		return "<img src=\"images/" + data2.Answer.substring(2, data2.Answer.length) + ".png\"></img>"
	}
	else
	{
		return "<p>" + data2.Answer + "</p>"
	}
}

function getDefinition(number)
{
	var data2 = data[number];
	if(data2.Definition.substring(0,2) == "i/")
	{
		return "<img src=\"images/" + data2.Definition.substring(2, data2.Definition.length) + ".png\"></img>"
	}
	else
	{
		return "<p>" + data2.Definition + "</p>"
	}
}

function getIndex()
{
	var a = Math.floor(Math.random()*data.length);
	while(a == pastIndex | data[a].Enabled.toLowerCase() != "true")
	{
		a = Math.floor(Math.random()*data.length);
	}
	pastIndex = a;
	return a;
}