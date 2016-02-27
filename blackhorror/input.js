var i_keys = {}

function i_key_status(key)
{
    return i_keys[key]
}

function i_init()
{
    $("body").on("keydown", function(e){
        i_set_status(e.keyCode, true)
    })
    $("body").on("keyup", function(e){
        i_set_status(e.keyCode, false)
    })
}

function i_set_status(keycode, status)
{
//    console.log(String.fromCharCode(keycode) + ":" + status)
    i_keys[String.fromCharCode(keycode)] = status;
}
