document.body.appendChild(canvas);

var hittest = function (a, b) {
    if ( (a.x < (b.x + b.w)) &&
         ((a.x + a.w) > b.x) &&
         (a.y < (b.y + b.h)) &&    
         ((a.y + a.h) > b.y) )
        return true;
    else
        return false;
}

var initEnemies = function(){
    var k = 0;
    for (var j = 0; j < 5; j++){
        for (var i = 0; i < 10; i++){
            enemies[k++] = {visible : true, image : enemyImage,
                x : i * 90, y: (j + 1) * 50, w : 64, h : 32 };
        }
    }
}

var drawEnemies = function() {
    //render enemies
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].visible)
            context.drawImage(enemies[i].image, enemies[i].x, enemies[i].y);
    //move enemies
    var dropdown = false;
    for (var i = 0; i < enemies.length; i++){
        if(enemies[i].visible){
            enemies[i].x += enemy_speed;
            if (enemies[i].x > (1340 - 64))
                dropdown = true;
            if (enemies[i].x < 0)
                dropdown = true;
            if (hittest(enemies[i], bullet)){
                enemies[i].visible = false;
                bullet.visible = false;
                bullet.x = hero.x + 30;
                bullet.y = 450;
                score += 10;
            }
        }
    }
    if (dropdown){
        enemy_speed = -enemy_speed;
        for (var i = 0; i < enemies.length; i++)
            enemies[i].y += 20;
    }
}

var drawBullet = function() {
    if (bullet.visible){
        context.drawImage(bullet.image, bullet.x, bullet.y);
        bullet.y -= bullet_speed;
        if (bullet.y < 0)
            bullet.visible = false;
    }
}

var render = function (){
    context.drawImage(bgImage, 0, 0);
    if(gameOver === 0){
        context.drawImage(hero.image, hero.x, hero.y);
        drawBullet();
        drawEnemies();
    }
}

var main = function(){   
    keysUpdate();
    render();
    requestAnimationFrame(main);
}