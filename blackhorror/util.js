var _ent_basic = {
	texture: "INVALID TEXTURE",
	x:0,
	y:0,
	xs:0,
	ys:0,
	direction:"left",
	move: function(direction) {
		this.direction = direction
		if(direction == "right")
		{
			this.x += this.speed
		}
		else
		{
			this.x -= this.speed
		}
	}
}

function get_entity()
{
	return Object.create(_ent_basic)
}
