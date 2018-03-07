//utworzenie canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 600;

//tło gry
var bgImage = new Image();
bgImage.src = "img/sky.png";

//bohatyrowicz
var heroImage = new Image();
heroImage.src = "img/airplane.png";
var hero = {image:heroImage, x:550, y:550, w:64, h:32, speed: 10};
