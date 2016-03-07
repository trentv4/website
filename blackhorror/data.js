var player = {
    texture: "player",
    x: 0,
    y: 50,
    xs: 12*5,
    ys: 27*5,
    speed: 4,
    anims: {
		idle: {
			frame:0,
			frame_length:1,
			delay:0,
			delay_length:50
		},
		walk: {
			frame:0,
			frame_length: 3,
			delay:0,
			delay_length: 4
		}
	},
	current_anim: "walk",
    direction: "left"
}
