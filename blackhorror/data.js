var torch = Object.create(_ent_basic)
torch.texture = "torch"
torch.x = -220,
torch.y = -220,
torch.xs = 180*3
torch.ys = 180*3

var player = Object.create(_ent_basic)
player.texture = "player"
player.x = 0
player.y = 20
player.xs = 80*3
player.ys = 120*3
player.speed = 4
player.anims = {
		idle: {
			frame:0,
			frame_length:3,
			delay:0,
			delay_length:50
		},
		walk: {
			frame:0,
			frame_length: 2,
			delay:0,
			delay_length: 4
		}
	}
player.current_anim = "idle"
player.children = [torch]
