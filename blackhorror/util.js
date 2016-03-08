var _ent_basic = {
	texture: "INVALID TEXTURE",
	x:0,
	y:0,
	xs:0,
	ys:0,
	direction:0,
	anims:[],
	current_anim:"",
	children:[],
	move: function(direction) {
		this.direction = direction
		this.current_anim = "walk"
		r_advance_frame(this.anims[this.current_anim])
		if(direction == 1)
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
