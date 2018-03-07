var keysDown = {};
document.addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
document.addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);

var keysUpdate = function(){ 
    //kontrola samolotu 
    //wystrzelenie pocisku
    if (32 in keysDown)
        if (!bullet.visible){
            bullet.visible = true;
            bullet.x = hero.x + 24;
            bullet.y = hero.y - 16;
        }
    //lewo
    if (37 in keysDown)
        if (hero.x > 0)
            hero.x -= hero.speed;
    //prawo 
    if (39 in keysDown)
        if (hero.x < 1276)
                hero.x += hero.speed;      
}
