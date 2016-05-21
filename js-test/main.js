//var output = $("#output")[0];

var person = {
	name: ["name", "lastName"],
	gender: "male",
	role: 8, //7->0: king, prince, king's family,  lord, lord's family, servant
	parents: [],
	children: [],
	heir: {},
	age: 0,
	physical: {
		hair: "brown",
		eyes: "green",
		height: [6,1],
		build: "fat",
		complexion: "white"
	},
	flaws: [ //two good, two bad
		"heroic",
		"lazy",
		"quick to anger"
	],
	economics: 10 //rich:10, nothing: 0
}

function generatePerson(father, mother)
{
	var person = {}
	person.name = name(father.lastName)
	person.gender = ["male", "female"][Math.floor(Math.random()*2)]
	person.role = role(father)
	person.parents = [father, mother];
	person.children = [];
	father.children.push(person)
	mother.children.push(person)
	person.age = father.age - 18;
	if(person.gender == "male" & father.children.length == 1)
	{
		father.heir = person;
	}
	person.physical = physical(father, mother, person)
	person.flaws = flaws(person)
	return person;
}
console.log(generatePerson(person, person))
console.log(generatePerson(generatePerson(person, person), person))

function flaws(me)
{
	var flaws = []
	var chosen_flaws = []
	return chosen_flaws;
}

function physical(father, mother, me)
{
	var stats = {}
	var _hair = [father.physical.hair, mother.physical.hair]
	var _eyes = [father.physical.eyes, mother.physical.eyes]
	var _height = [father.physical.height, mother.physical.height]
	var _complexion = [father.physical.complexion, mother.physical.complexion]
	var hair_bonuses = getbonus(me);
	var eyes_bonuses = getbonus(me);
	var height_bonuses = getbonus(me);
	var complexion_bonuses = getbonus(me);

	if(hair_bonuses[0] < hair_bonuses[1])
	{ stats.hair = _hair[1] } else { stats.hair = _hair[0];}

	if(eyes_bonuses[0] < eyes_bonuses[1])
	{ stats.eyes = _eyes[1] } else { stats.eyes = _eyes[0];}

	if(height_bonuses[0] < height_bonuses[1])
	{ stats.height = _height[1] } else { stats.height = _height[0];}

	if(hair_bonuses[0] < hair_bonuses[1])
	{ stats.complexion = _complexion[1] } else { stats.complexion = _complexion[0];}

	stats.build = ["fat", "thin", "stocky", "strong", "tiny"][Math.floor(Math.random()*5)]
	return stats;
}

function getbonus(me)
{
	var father_bonus = 0
	var mother_bonus = 0
	if(me.gender == "male")
	{
		father_bonus += 5;
	}
	else
	{
		mother_bonus += 5;
	}
	father_bonus += Math.ceil(Math.random()*15)
	mother_bonus += Math.ceil(Math.random()*15)
	return [father_bonus, mother_bonus]
}

function name(lastName)
{
	var possibilities = ["kappa", "forsen", "scamaz", "reynad"]
	var name = possibilities[Math.floor(Math.random()*possibilities.length)]
	return [name, lastName];
}

function role(father)
{
	switch(father.role)
	{
		case 8: return 7; //king -> prince
		case 7: return 6; //prince -> royalty
		case 6: return 6; //royalty -> royalty
		case 5: return 4; //lord -> lord's family
		case 4: return 4; //lord's family -> lord's family
		case 3: return 3; //servant -> servant
		default: return 0; //peasant
	}
}
