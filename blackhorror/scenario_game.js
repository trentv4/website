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
	if(!move)
	{
		player.current_anim = "idle"
		r_advance_frame(player.anims.idle)
	}
}
