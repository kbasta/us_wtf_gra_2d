var keysDown = {};
document.addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
document.addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);

var keysUpdate = function(){              
    if (37 in keysDown)
        if (hero.x > 0){
            hero.x -= hero.speed;
            }    
    if (39 in keysDown)
        if (hero.x < 1135)
                hero.x += hero.speed;      
}
