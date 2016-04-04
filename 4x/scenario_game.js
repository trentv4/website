var scenario_game = {
	main: main
}

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

}
