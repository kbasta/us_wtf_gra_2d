document.body.appendChild(canvas);

var hitTest = function (a, b) {
    if ( (a.x < (b.x + b.w)) &&
         ((a.x + a.w) > b.x) &&
         (a.y < (b.y + b.h)) &&    
         ((a.y + a.h) > b.y) )
        return true;
    else
        return false;
}

var areVisibleEnemies = function(){
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].visible)
            return true;
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

var initEnemyBullet = function (k) {
    var check = false;
    while (!check){
        var enemy = Math.floor(Math.random() * enemies.length);
        if (enemies[enemy].visible){
            enemiesBullet[k] = {visible : true, image : bulletImage, x : enemies[enemy].x + 30,
                                y : enemies[enemy].y + 32, w : 16, h : 16}
            check = true;
        }
    }
}

var initEnemiesBullet = function (){
    var k = 0;
    while (k < enemyBullets)
        initEnemyBullet(k++);
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
            enemies[i].x += enemySpeed;
            if (enemies[i].x > (1340 - 64))
                dropdown = true;
            if (enemies[i].x < 0)
                dropdown = true;
            if (hitTest(enemies[i], bullet)){
                enemies[i].visible = false;
                bullet.visible = false;
                bullet.x = hero.x + 30;
                bullet.y = 450;
                score += 10;
            }
        }
    }
    if (dropdown){
        enemySpeed = -enemySpeed;
        for (var i = 0; i < enemies.length; i++)
            enemies[i].y += 20;
    }
}

var drawBullet = function() {
    if (bullet.visible){
        context.drawImage(bullet.image, bullet.x, bullet.y);
        bullet.y -= bulletSpeed;
        if (bullet.y < 0)
            bullet.visible = false;
    }
}

var drawEnemyBullets = function (){
    for (var i = 0; i < enemiesBullet.length; i++){
        context.drawImage(enemiesBullet[i].image, enemiesBullet[i].x, enemiesBullet[i].y);
        enemiesBullet[i].y += bulletSpeed;
        if (enemiesBullet[i].y > 620)
            initEnemyBullet(i);
        if (hitTest(enemiesBullet[i], hero)){
            initEnemyBullet(i);
            life--;
        }    
    }
    if (life === 0)
        gameOver = 1;
}

var drawScore = function(){
    context.fillStyle = "#F0F";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Score: " + score, 5, 5);
    context.fillText("Life: " + life, 650, 5);
}

var render = function (){
    context.drawImage(bgImage, 0, 0);
    
    // rozmiar mapy  750x12288.
    //context.drawImage(bgScroll, 0 , 12288 - 500 - scrollSpeed, 750,
    //                    12288 - scrollSpeed, 0, 0, 750, 12288 - speedScroll);
    //scrollSpeed++;
                        
    if(gameOver === 0){
        context.drawImage(hero.image, hero.x, hero.y);
        drawBullet();
        drawScore();
        if(areVisibleEnemies()){
            drawEnemies();
            drawEnemyBullets();
        } else {
            context.fillStyle = "#F0F";
            context.font = "48px Helvetica";
            context.fillText("Winner", 550, 300);
        }    
    } else {
        context.fillStyle = "#F0F";
        context.font = "48px Helvetica";
        context.fillText("Game Over", 550, 300);
    }
}

var main = function(){   
    initEnemies();
    initEnemiesBullet();
    repeat();
}

var repeat = function(){
    keysUpdate();
    render();
    requestAnimationFrame(repeat);
}