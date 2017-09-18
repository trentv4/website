window.get = (e) => document.getElementById(e)
window.make = (e) => document.createElement(e)
window.xml = (type, url, params, callback) => {
	let request = new XMLHttpRequest()
	request.open(type, url, true)

	request.onreadystatechange = () => {
		if(request.readyState == 4 & request.status == 200)
		{
			callback(request.responseText)
		}
	}
	request.setRequestHeader('Content-type', 'application/json');
	request.send(params)
}

let sheet = {
	name: "name",
	player: "player",
	classes: "classes",
	race: "race",
	alignment: "alignment",
	deity: "deity",
	size: "size",
	age: "age",
	gender: "gender",
	height: "height",
	weight: "weight",
	eyes: "eyes",
	hair: "hair",
	skin: "skin",
	stats: {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0
	},
	misc: {
		hp: 0,
		current_hp: 0,
		ac: 0,
		touch_ac: 0,
        attack_bonus: 0,
		initiative: 0,
		speed: 0,
		fortitude: {
			base: 0,
			ability: "con",
			misc: 0
		},
		reflex: {
			base: 0,
			ability: "dex",
			misc: 0
		},
		will: {
			base: 0,
			ability: "wis",
			misc: 0
		},
		grapple: {
			base: 0,
			ability: "str",
			misc: 0
		},
		damage_reduct: 0
	},
	weapons: [
		{
			name: "",
			dmg: "",
			crit: "",
			notes: ""
		},
		{
			name: "",
			dmg: "",
			crit: "",
			notes: ""
		},
		{
			name: "",
			dmg: "",
			crit: "",
			notes: ""
		}
	],
	armor: [
		{
			name: "",
			ac: "",
			type: "",
			notes: ""
		},
		{
			name: "",
			ac: "",
			type: "",
			notes: ""
		},
		{
			name: "",
			ac: "",
			type: "",
			notes: ""
		}
	],
	experience: "",
	inventory: "",
	feats: "",
	languages: "",
	abilities: "",
	spells_used: [0,0,0,0,0,0,0,0,0,0],
	spells_max: [0,0,0,0,0,0,0,0,0,0],
	spell_slots: ["", "", "", "", "", "", "", "", "", ""],
	skills: {
		appraise: {
			ranks: 0,
			ability: "int"
		},
		balance: {
			ranks: 0,
			ability: "dex"
		},
		bluff: {
			ranks: 0,
			ability: "cha"
		},
		climb: {
			ranks: 0,
			ability: "str"
		},
		concentration: {
			ranks: 0,
			ability: "con"
		},
		craft_1: {
			ranks: 0,
			ability: "int"
		},
		craft_2: {
			ranks: 0,
			ability: "int"
		},
		craft_3: {
			ranks: 0,
			ability: "int"
		},
		decipher_script: {
			ranks: 0,
			ability: "int"
		},
		diplomacy: {
			ranks: 0,
			ability: "cha"
		},
		disable_device: {
			ranks: 0,
			ability: "int"
		},
		disguise: {
			ranks: 0,
			ability: "cha"
		},
		escape_artist: {
			ranks: 0,
			ability: "dex"
		},
		forgery: {
			ranks: 0,
			ability: "int"
		},
		gather_info: {
			ranks: 0,
			ability: "cha"
		},
		handle_animal: {
			ranks: 0,
			ability: "cha"
		},
		heal: {
			ranks: 0,
			ability: "wis"
		},
		hide: {
			ranks: 0,
			ability: "dex"
		},
		intimidate: {
			ranks: 0,
			ability: "cha"
		},
		jump: {
			ranks: 0,
			ability: "str"
		},
		knowledge_1: {
			ranks: 0,
			ability: "int"
		},
		knowledge_2: {
			ranks: 0,
			ability: "int"
		},
		knowledge_3: {
			ranks: 0,
			ability: "int"
		},
		knowledge_4: {
			ranks: 0,
			ability: "int"
		},
		knowledge_5: {
			ranks: 0,
			ability: "int"
		},
		listen: {
			ranks: 0,
			ability: "wis"
		},
		move_silently: {
			ranks: 0,
			ability: "dex"
		},
		open_lock: {
			ranks: 0,
			ability: "dex"
		},
		perform_1: {
			ranks: 0,
			ability: "cha"
		},
		perform_2: {
			ranks: 0,
			ability: "cha"
		},
		perform_3: {
			ranks: 0,
			ability: "cha"
		},
		profession_1: {
			ranks: 0,
			ability: "wis"
		},
		profession_2: {
			ranks: 0,
			ability: "wis"
		},
		ride: {
			ranks: 0,
			ability: "dex"
		},
		search: {
			ranks: 0,
			ability: "int"
		},
		sense_motive: {
			ranks: 0,
			ability: "wis"
		},
		sleight_of_hand: {
			ranks: 0,
			ability: "dex"
		},
		spellcraft: {
			ranks: 0,
			ability: "int"
		},
		spot: {
			ranks: 0,
			ability: "wis"
		},
		survival: {
			ranks: 0,
			ability: "wis"
		},
		swim: {
			ranks: 0,
			ability: "str"
		},
		tumble: {
			ranks: 0,
			ability: "dex"
		},
		use_magic_device: {
			ranks: 0,
			ability: "cha"
		},
		use_rope: {
			ranks: 0,
			ability: "dex"
		}
	}
}

function update() {
	s("name", sheet.name)
	s("player", sheet.player)
	s("classes", sheet.classes)
	s("race", sheet.race)
	s("alignment", sheet.alignment)
	s("deity", sheet.deity)
	s("size", sheet.size)
	s("age", sheet.age)
	s("gender", sheet.gender)
	s("height", sheet.height)
	s("weight", sheet.weight)
	s("eyes", sheet.eyes)
	s("hair", sheet.hair)
	s("skin", sheet.skin)

	s("score_str_val", sheet.stats.str)
	s("score_str_mod", (Math.floor(sheet.stats.str/2) - 5))

	s("score_dex_val", sheet.stats.dex)
	s("score_dex_mod", (Math.floor(sheet.stats.dex/2) - 5))

	s("score_con_val", sheet.stats.con)
	s("score_con_mod", (Math.floor(sheet.stats.con/2) - 5))

	s("score_int_val", sheet.stats.int)
	s("score_int_mod", (Math.floor(sheet.stats.int/2) - 5))

	s("score_wis_val", sheet.stats.wis)
	s("score_wis_mod", (Math.floor(sheet.stats.wis/2) - 5))

	s("score_cha_val", sheet.stats.cha)
	s("score_cha_mod", (Math.floor(sheet.stats.cha/2) - 5))

	s("hp_current", sheet.misc.current_hp)
	s("hp_max", sheet.misc.hp)
	s("ac", sheet.misc.ac)
	s("touch_ac", sheet.misc.touch_ac)
	s("initiative", sheet.misc.initiative)
	s("speed", sheet.misc.speed)
	s("damage_reduct", sheet.misc.damage_reduct)

	s("fortitude_total", sheet.misc.fortitude.base + sheet.misc.fortitude.misc)
}

function s(htmlName, content) {
	get(htmlName).innerHTML = content
}

//update()
/*
xml("GET", "/api/character-sheet/request?id=" + sample.id, "", (e) => {
	console.log(e)
	xml("GET", "/api/character-sheet/new-id", "", (e) => {
		sample.id = e
		xml("POST", "/api/character-sheet/update", JSON.stringify(sample), (e) => {
			console.log(e)
			xml("GET", "/api/character-sheet/request?id=" + sample.id, "", (e) => {
				console.log(e)
			})
		})
	})
})
*/
