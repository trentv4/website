var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1sW3SaI26uAAiRylGc2fLqQcZBO_I7gIGieyq78Do2rs/pubhtml"
Tabletop.init({
	key: spreadsheetURL,
	callback: showInfo,
	simpleSheet: true
})

function showInfo(d, tabletop)
{
	var genRFT
	var genAMRAP
	var genChipper

	var amrap_timeRange
	var amrap_exerciseCount
	var amrap_reps

	var chipper_count
	var chipper_reps
	var chipper_repsMod
}
