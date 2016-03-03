var player = {
    texture: "player",
    x: 0,
    y: 50,
    xs: 12*5,
    ys: 27*5,
    speed: 4,
    anim_frame: 0,
    anim_delay: 0,
    anim_delay_length: 4,
    anim_length: 3,
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
        player.x -= player.speed;
        player.direction = "left"
        r_advance_frame(player)
    }
    if(i_key_status("D"))
    {
        player.x += player.speed;
        player.direction = "right";
        r_advance_frame(player)
    }
}

function m_run_once()
{
    r_init()
    i_init()
}
