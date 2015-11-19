var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1yOgfwOgjLeefXId2eBFB1N8G0iZMIvs1Q7jUClnz1S4/pubhtml"
Tabletop.init({
	key: spreadsheetURL,
	callback: showInfo,
	simpleSheet: true
})

var data;


function showInfo(d, tabletop)
{
	data = d;
}

