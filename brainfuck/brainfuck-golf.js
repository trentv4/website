o = ">++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->+++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+."
u = o.length
c = []
c.z = c.push
q = 0;
d = []
s = 0
n = null
j = ""
e = {
	"<":function(){if(s > 0) s--},
	">":function(){s++},
	"+":function(){if(d[s] == n) d[s] = 0; d[s]++},
	"-":function(){if(d[s] == n) d[s] = 0; d[s]--},
	".":function(){j += String.fromCharCode(d[s])},
	",":function(){d[s] = parseInt(prompt("Enter a number"))},
	"[":function()
	{
		if(d[s] == n) d[s] = 0;
		if(d[s] == 0)
		{
			var f = 0
			for(var i = q; i < u; i++)
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
	},
	"]":function()
	{
		if(d[s] == n) d[s] = 0;
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
	}
}
for(i in o)
{
	c.z(e[o[i]])
}
for(q = 0; q < u; q++)
{
	c[q]();
}
console.log(j, d)
