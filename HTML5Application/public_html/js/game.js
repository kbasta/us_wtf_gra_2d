document.body.appendChild(canvas);

var render = function (){
    context.drawImage(bgImage, 0, 0);
    context.drawImage(hero.image, hero.x, hero.y);
}

var main = function(){   
    keysUpdate();
    render();
    requestAnimationFrame(main);
}