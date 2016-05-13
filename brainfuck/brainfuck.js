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

var command_list = {
    ">": function() { if(memory.length > memory.index) { memory.index++ } else { memory.index++; memory.list.push(0) }},
    "<": function() { if(memory.index > 0) { memory.index-- } },
    "+": function() { memory.list[memory.index]++ },
    "-": function() { if(memory.list[memory.index] > 0) { memory.list[memory.index]-- } },
    ".": function() { document.getElementById("output").value += memory.list[memory.index] + " " },
    ",": function() { memory.list[memory.index] = parseInt(prompt("Enter a number")) },
    "[": function() {  },
    "]": function() {  }
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
    commands.list[commands.index]()
    commands.index++;
}

function bf_stop() {
    clearInterval(interval_delay)
}

function bf_clear() {
    commands = {
        index: 0,
        list: [],
    }
}

function bf_run() {
    while(commands.list[commands.index] != "NOP")
    {
        bf_step()
    }
}
