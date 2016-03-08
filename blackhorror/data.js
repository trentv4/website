var torch = Object.create(_ent_basic)
torch.texture = "overlay"
torch.x = -1220
torch.y = -700
torch.xs = 2560
torch.ys = 1440

var spook = Object.create(_ent_basic)
spook.texture = "spook"
spook.x = 920
spook.y = 170
spook.xs = 80*4
spook.ys = 120*4
spook.direction = 1

var player = Object.create(_ent_basic)
player.texture = "player"
player.x = 0
player.y = 270
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
		crouch_idle: {
			frame: 0,
			frame_length: 1,
			delay:0,
			delay_length: 50
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
