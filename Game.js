var mainContainer = document.getElementsByTagName('canvas')[0];
var ctx = mainContainer.getContext('2d');
mainContainer.height = window.innerHeight;
mainContainer.width = window.innerWidth;


var charId = sessionStorage.getItem("char")
var src;

var reokets = {
    'first' : 'assets/Missile_01.png' ,
    'second' : 'assets/Bomb_01_1.png' ,
    'third' : 'assets/Crystal_03.png'
}


switch (sessionStorage.char) {
    case '1':
        src = reokets['first']
        break;

    case '2':
        src = reokets['second']
        break;
    
    case '3':
        src = reokets['third']

        break;

    default:
        src = 1
        break;
}



var player = new Player(40,105,src ,100,200);
var gameOverFlage = false

displayScore(player.score);
displayLives(player.lives);

document.addEventListener('mousemove',(event) => {
    if(!gameOverFlage)
    {
        player.move(event.x,event.y)
    }
});

document.addEventListener('click',function (event) {
    if(!gameOverFlage)
    {
        player.fire()
    }

})

function distacne(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}

function displayScore(score) {
    console.log(score)
    ctx.fillStyle = "white";
    ctx.font = '16px serif';
    ctx.clearRect(mainContainer.width-900,mainContainer.height-40,1000,500)
    ctx.fillText("Score : "+score,mainContainer.width-100,mainContainer.height-70)
}

function displayLives(lives) {
    ctx.fillStyle = "white";
    ctx.font = '20px serif';
    ctx.clearRect(0,mainContainer.height-60,300,500)
    var image = new Image();
    image.src = 'assets/HP_Bonus.png';
    image.onload = function (){

        ctx.drawImage(image,80,mainContainer.height-50,30,30);
    }
    ctx.fillText(lives+"X",50,mainContainer.height-30)
}

function gameOver() {

     gameOverFlage = true
    clearInterval(intervalEnemiesID)
    player.clear()
    ctx.clearRect(0,0,mainContainer.width,mainContainer.height)
    ctx.fillStyle = "white";
    ctx.font = '60px serif';
    ctx.fillText("Game Over",mainContainer.width*0.35,mainContainer.height* 0.5)
}
var enemies = []

var intervalEnemiesID = setInterval(function () {
    var x = Math.random()*mainContainer.width
    var y = 0
    var enemy = new Enemy('assets/Crystal_02.png',x,y,35,50)
    enemies.push(enemy)
    enemy.move(10)
},1500)



setInterval(function () {
    for(var i = 0;i<enemies.length;++i)
    {
        if(enemies[i].y > mainContainer.height-120)
        {
            enemies[i].kill()
            enemies.splice(i,1);
            continue;
        }

        if(distacne(player.x,player.y,enemies[i].x,enemies[i].y)<40&&!gameOverFlage)
        {
            player.lives--;
            if(player.lives===0)
            {
                gameOver();
                continue
            }
            displayLives(player.lives);
            enemies[i].kill()
            enemies.splice(i,1);
            player.clear()
            player.draw()
            continue;
        }

        for(var j = 0;j<player.bullets.length;++j)
        {
            if(gameOverFlage)
            {
                player.bullets[j].kill()
                player.bullets.splice(j,1);
                continue
            }
            if(player.bullets[j].y<-100)
            {
                player.bullets[j].kill()
                player.bullets.splice(j,1);
                continue;
            }
            if(distacne(enemies[i].x,enemies[i].y,player.bullets[j].x,player.bullets[j].y)<40)
            {
            //console.log(distacne(enemies[i].x,enemies[i].y,player.bullets[j].x,player.bullets[j].y))
                enemies[i].kill()
                player.bullets[j].kill()
                enemies.splice(i,1);
                player.bullets.splice(j,1);
                player.score+=10;
                displayScore(player.score);
            }
        }

        if(gameOverFlage)
        {
            enemies[i].kill()
            enemies.splice(i,1);
        }
    }
},50)




