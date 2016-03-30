var scenario_game = {
	main: main
}

var entities = [spook, player]

function main()
{
	//render
	r_clear()
	r_draw("terrain/floor_1", 0,0,1280,720,1)
	r_draw_entities(entities)

	//logic
	m_check_input()
}

function m_check_input()
{
	var move = false
    if(i_key_status("A"))
    {
		player.move(0)
        r_advance_frame(player.anims.walk)
		move = true
    }
    if(i_key_status("D"))
    {
		player.move(1)
        r_advance_frame(player.anims.walk)
		move = true
    }
	if(i_key_status("S"))
	{
		player.speed = 2
		player.current_anim = "crouch_idle"
		player.children[0].y = -650
		r_advance_frame(player.anims.crouch_idle)
		move = true
	}
	else
	{
		player.children[0].y = -700
		player.speed = 4
	}
	if(!move)
	{
		player.current_anim = "idle"
		r_advance_frame(player.anims.idle)
	}
}