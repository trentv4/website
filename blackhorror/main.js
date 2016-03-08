var entities = [player]

var has_crashed = false

function main()
{
	if(!has_crashed)
	{
		//render loop
	    r_clear();
	    r_draw_entities(entities)

	    //logic loop
	    m_check_input()
	}
}

function m_check_input()
{
	var move = false
    if(i_key_status("A"))
    {
		player.move(0, player.speed)
		player.current_anim = "walk"
        r_advance_frame(player.anims.walk)
		move = true
    }
    if(i_key_status("D"))
    {
		player.move(1, player.speed)
		player.current_anim = "walk"
        r_advance_frame(player.anims.walk)
		move = true
    }
	if(!move)
	{
		player.current_anim = "idle"
		r_advance_frame(player.anims.idle)
	}
}

function m_run_once()
{
    r_init()
    i_init()
}
