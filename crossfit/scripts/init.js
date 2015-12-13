var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1sW3SaI26uAAiRylGc2fLqQcZBO_I7gIGieyq78Do2rs/pubhtml"
Tabletop.init({
	key: spreadsheetURL,
	callback: showInfo,
	simpleSheet: true
})
var d;//ata
var genRFT
var genAMRAP
var genChipper

var rft_exerciseLoopRange
var rft_exerciseCount
var rft_reps

var amrap_timeRange
var amrap_exerciseCount
var amrap_reps

var chipper_count
var chipper_reps
var chipper_repsMod

////

var randomWeighting;
var wodWeighting;

////

var wodGirlsWeighting;
var wodHeroWeighting;
var wodGamesWeighting;
var wodOtherWeighting;

function showInfo(f, tabletop)
{
	console.log(f);
	d = f;	

	genRFT = p(d[1].h1)
	genAMRAP = p(d[1].h2) + genRFT;
	genChipper = p(d[1].h3) + genAMRAP;	

	amrap_timeRange = d[3].h1.split(",");
	amrap_exerciseCount = d[3].h2.split(",");
	amrap_reps = d[3].h3.split(",");

	rft_exerciseLoopRange = d[5].h1.split(",")
	rft_exerciseCount = d[5].h2.split(",");
	rft_reps = d[5].h3.split(",")

	chipper_count = d[7].h1.split(",");
	chipper_reps = d[7].h2.split(",");
	chipper_repsMod = d[7].h3.split(",");

	randomWeighting = p(d[9].h1);
	wodWeighting = p(d[9].h2) + randomWeighting;

	wodGirlsWeighting = d[11].h1;
	wodHeroWeighting = d[11].h2;
	wodGamesWeighting = d[11].h3;
	wodOtherWeighting = d[11].h4;

	generate();
}

function p(q)
{
	return parseInt(q);
}
/*
var rft_exerciseLoopRange
var rft_exerciseCount
var rft_reps

var amrap_timeRange
var amrap_exerciseCount
var amrap_reps

var chipper_count
var chipper_reps
var chipper_repsMod
*/
function generate()
{
	var a = [];
	//[Workout type, [cust1, cust2, cust3]/[description], ]
	var rw = getRandom();
//	if(rw >= 0 & rw < randomWeighting)
	if(true)
	{
		a.push("Random workout")
		console.log("Chosen random workout");
		var rac = getRandom();
//		if(rac >= 0 & rac > genRFT)
		if (true)
		{
			console.log("Chose RFT");

		}
		else if(rac >= genRFT & rac < genAMRAP)
		{
			console.log("Chose AMRAP");
			//amrap
		}
		else if(rac >= genAMRAP & rac < genChipper)
		{
			console.log("Chose chipper");
		}
	}
	else if(rw >= randomWeighting & rw < wodWeighting)
	{
		console.log("Chosen WOD workout");

	}

	console.log(a);
}

function getRandom(max, bonus)
{
	return Math.floor(Math.random()*max)+bonus;
}

function getRandom()
{
	return Math.floor(Math.random()*100);
}