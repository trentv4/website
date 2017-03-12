o = ">++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->+++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+."
d = []
s = 0
j = ""
function a(b) {
	for (f = b; f;) {
		if(o[q += b] == "[") f++
		if(o[q] == "]") f--
	}
}
e = {
	"<":function(){s--},
	">":function(){s++},
	"+":function(){d[s] = (d[s] || 0) + 1},
	"-":function(){d[s] = (d[s] || 0) - 1},
	".":function(){j += String.fromCharCode(d[s])},
	",":function(){d[s] = parseInt(prompt("Enter a number"))},
	"[":function(){if(!d[s]) a(1)},
	"]":function(){if(d[s]) a(-1)}
}
for(q = 0; q < o.length; q++) e[o[q]]()
console.log(j, d)
