/*
>	Move the pointer to the right
<	Move the pointer to the left
+	Increment the memory cell under the pointer
-	Decrement the memory cell under the pointer
.	Output the character signified by the cell at the pointer
,	o a character and store it in the cell at the pointer
[	Jump past the matching ] if the cell under the pointer is 0
]	Jump back to the matching [ if the cell under the pointer is nonzero
*/

var o = ">++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->+++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+."
var c = []
var q = 0;
var d = []
var s = 0
var j = ""
for(var i = 0; i < o.length; i++)
{
	if(o[i] == "<") c.push(function(){if(s > 0) s--})
	if(o[i] == ">") c.push(function(){s++})
	if(o[i] == "+") c.push(function(){if(d[s] == null) d[s] = 0; d[s]++})
	if(o[i] == "-") c.push(function(){if(d[s] == null) d[s] = 0; d[s]--})
	if(o[i] == ".") c.push(function(){j += String.fromCharCode(d[s])})
	if(o[i] == ",") c.push(function(){d[s] = parseInt(prompt("Enter a number"))})
	if(o[i] == "[") c.push(function()
	{
		if(d[s] == undefined) d[s] = 0;
		if(d[s] == 0)
		{
			var f = 0
			for(var i = q; i < o.length; i++)
			{
				if(o[i] == "[") f++;
				if(o[i] == "]" & f != 0) f--;
				if(o[i] == "]" & f == 0)
				{
					q = i;
					break;
				}
			}
		}
	})
	if(o[i] == "]") c.push(function()
	{
		if(d[s] == undefined) d[s] = 0;
		if(d[s] != 0)
		{
			var f = 0
			for(var i = q; i > 0; i--)
			{
				if(o[i] == "]") f++;
				if(o[i] == "[" & f != 0) f--;
				if(o[i] == "[" & f == 0)
				{
					q = i;
					break;
				}
			}
		}
	})
}
for(q = 0; q < c.length; q++)
{
	c[q]();
}
console.log(j, d)
