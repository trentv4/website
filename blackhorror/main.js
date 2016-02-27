var player = {
    texture: "player",
    x: 0,
    y: 50,
    xs: 12*5,
    ys: 27*5,
    direction: "left"
}
var entities = [player]

function main()
{
    //render loop
    r_clear();
    r_draw_entities(entities)

    //logic loop
    m_check_input()
}

function m_check_input()
{
    if(i_key_status("A"))
    {
        player.x -= 2;
        player.direction = "left"
    }
    if(i_key_status("D"))
    {
        player.x += 2;
        player.direction = "right";
    }
}

function m_run_once()
{
    r_init()
    i_init()
}
