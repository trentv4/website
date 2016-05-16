var interval_delay;
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
var loop = []
var command_count = 0;
var max_command_count = 10000;

var command_list = {
    ">": function() { if(memory.list.length-1 > memory.index) { memory.index++ } else { memory.index++; memory.list.push(0) }},
    "<": function() { if(memory.index > 0) { memory.index-- } },
    "+": function() { memory.list[memory.index]++ },
    "-": function() { if(memory.list[memory.index] > 0) { memory.list[memory.index]-- } },
	".": function() { document.getElementById("output").value += String.fromCharCode(memory.list[memory.index]) + " " },
	"~": function() { document.getElementById("output").value += memory.list[memory.index] + " " },
	"#": function() { for(var i = 0; i < memory.list.length; i++){document.getElementById("output").value += memory.list[i] + " " }},
    ",": function() {
		var inp = parseInt(prompt("Enter a number"))
		while(isNaN(inp))
		{
			inp = parseInt(prompt("Not a number, try again"))
		}
		memory.list[memory.index] = inp
	},
    "[": function() {
		if(memory.list[memory.index] != 0)
		{
			var a = 0;
			for(var i = commands.index+1; i < commands.list.length; i++)
			{
				if(commands.list[i] == command_list["["])
				{
					a++;
				}
				if(commands.list[i] == command_list["]"])
				{
					if(a == 0)
					{
						loop.push([commands.index, i])
						console.log(loop[0])
						break;
					} else {
						a--;
					}
				}

			}
		}
	},
    "]": function() {
		if(memory.list[memory.index] > 0)
		{
			commands.index = loop[loop.length-1][0]
		} else {
			loop.pop()
		}
	}
}

var commands = {
    index: 0,
    list: [],
}

var memory = {
    index: 0,
    list: [0],
}

function bf_load() {
    var data = document.getElementById("input").value;
    console.log("Loading: " + data)
    var i = data.split("")
    for(var g = 0; g < i.length; g++)
    {
        commands.list.push(command_list[i[g]])
    }
    commands.list.push("NOP")
}

function bf_step() {
	console.log("Stepping")
	command_count++
	if(command_count < max_command_count)
	{
		if(commands.list[commands.index] != null)
		{
			commands.list[commands.index]()
		    commands.index++;
		}
	}
	else {
		commands.index = commands.list.length-1  //always nop
		document.getElementById("output").value = "Too many operations! We suspect an infinite loop. If this is not the case, run 'max_command_count = 1000000' in your F12 console menu."
	}
}

function bf_clear() {
	console.clear()
	console.log("Clearing")
	loop = []
    commands = {
        index: 0,
        list: [],
    }
	memory = {
	    index: 0,
	    list: [0],
	}
	document.getElementById("output").value = ""
}

function bf_run() {
	console.log("Running")
    while(commands.list[commands.index] != "NOP")
    {
        bf_step()
    }
	console.log("Finished running")
	console.log(memory)
}
