//utworzenie canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 1340;
canvas.height = 650;

//punkty
var score = 0;

//tło gry
var bgImage = new Image();
bgImage.src = "img/sky.png";

//bohatyrowicz
var heroImage = new Image();
heroImage.src = "img/airplane.png";
var hero = {image:heroImage, x:600, y:600, w:64, h:32, speed: 10};

//wrogowicze
var enemyImage = new Image();
enemyImage.src = "img/enemy.png";
var enemies = [];

//pociskowiec
var bulletImage = new Image();
bulletImage.src = "img/bullet.png";
var bullet = {visible : false, image : bulletImage, 
              x : 0, y : 0, w : 16, h : 20, speed : 30}
          
//tablica pocisków rówgów
var enemiesBullet = [];