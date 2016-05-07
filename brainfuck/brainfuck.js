var i = 0;
var commands;
var l = []
var t = [0]
var c = 0;
var output = ""

function brainfuck_load(input)
{
	commands = input.split("")
	commands.push('z')
	console.log(commands)
}

function brainfuck_run()
{

	var status = true;
	while(status)
	{
		status = !brainfuck_tick()
		i++
		console.log("running")
	}
	console.log(output)
}

function brainfuck_tick()
{
	lastcommand = i;
	if(commands[i] == '>')
	{
		if(t.length <= c + 1)
		{
			t.push(0)
		}
		c++;
	}
	if(commands[i] == '<')
	{
		if(c > 0) c--;
	}
	if(commands[i] == '+')
	{
		t[c]++;
	}
	if(commands[i] == '-')
	{
		t[c]--;
	}
	if(commands[i] == '.')
	{
		output += (String.fromCharCode(t[c]));
	}
	if(commands[i] == ',')
	{

	}
	if(commands[i] == '[')
	{
		l.push(i)
	}
	if(commands[i] == ']')
	{
		if(t[c] > 0)
		{
			i = l[l.length-1]
		}
		else
		{
			l.pop()
		}
	}
	if(commands[i] == 'z')
	{
		return true;
	}
	else
	{
		return false
	}
}
