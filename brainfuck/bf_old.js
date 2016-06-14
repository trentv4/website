var halt = false;
var autohalt = false;
var commands_s;
var commands = []
var c_index = 0;
var memory = [0]
var m_index = 0;
var loops = []

var loop_hardcap = 1000;
var loop_cap_counter = 0;

/*
>	Move the pointer to the right
<	Move the pointer to the left
+	Increment the memory cell under the pointer
-	Decrement the memory cell under the pointer
.	Output the character signified by the cell at the pointer
,	Input a character and store it in the cell at the pointer
[	Jump past the matching ] if the cell under the pointer is 0
]	Jump back to the matching [ if the cell under the pointer is nonzero
*/

var add = function() { memory[m_index]++ }
var sub = function() { if(memory[m_index] > 0) { memory[m_index]--; } }
var shiftleft = function() { if(m_index > 0) {m_index--} }
var shiftright = function() { if(memory.length >= m_index){memory.push(0)} m_index++ }
var getinput = function() { }
var print = function() { document.getElementById("output").value += memory[m_index] + " ";}
var loopstart = function() { loops.push(c_index+1) }

var loopend = function() {
	if(memory[m_index] != 0 & loop_hardcap > loop_cap_counter-1) {
		c_index = loops[loops.length-1]-1
		loop_cap_counter++;
	}
	else {
		loop_cap_counter = 0;
		loops.pop()
	}
}

function bf_stop() {
	autohalt = true;
}

function bf_load_and_exec() {
	console.log(document.getElementById("output").value)
	document.getElementById("output").value = "";
	bf_parse(document.getElementById("input").value)
	bf_exec()
}

var bf_exec = function() {
	console.log("excecuting")
	halt = false
	while(commands[c_index] != "end" & halt == false) {
		bf_tick()
		if(autohalt) {
			halt = true
		}
	}
}

var bf_tick = function() {
	commands[c_index]();
	c_index++;
}

var bf_parse = function(input) {
	commands_s = input.split('')
	for(var i = 0; i < commands_s.length; i++)
	{
		if(commands_s[i] == '+') { commands.push(add) }
		if(commands_s[i] == '-') { commands.push(sub) }
		if(commands_s[i] == '.') { commands.push(print) }
		if(commands_s[i] == ',') { commands.push(getinput) }
		if(commands_s[i] == '>') { commands.push(shiftright) }
		if(commands_s[i] == '<') { commands.push(shiftleft) }
		if(commands_s[i] == '[') { commands.push(loopstart) }
		if(commands_s[i] == ']') { commands.push(loopend) }
	}
	commands.push("end")
}
//bf_parse("+++++[->+++++<]>.")
//bf_exec()
