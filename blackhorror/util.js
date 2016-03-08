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
	move: function(direction, speed) {
		this.direction = direction
		if(direction == 1)
		{
			this.x += speed
		}
		else
		{
			this.x -= speed
		}
	}
}
