var Enemy = function (enemy,x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = enemy;
    this.intervalID
    this.image.onload=() => {
        ctx.drawImage(this.image,this.x,this.y,this.width, this.height)
    }

}


sessionStorage.setItem("level",window.location.search.substr(-1))
var  levelSpeed;

switch(sessionStorage.level){
    case '1':
        levelSpeed = 500;
        break;

    case '2':
            levelSpeed = 100;
            break;

    case '2':
            levelSpeed = 10;
            break;
}



Enemy.prototype.clear = function()  {
    ctx.clearRect(this.x, this.y, this.width, this.height);
}

Enemy.prototype.draw = function() {
    ctx.drawImage(this.image,this.x,this.y,this.width, this.height)
}

Enemy.prototype.kill = function(){
    this.clear()
    clearInterval(this.intervalID)
}

Enemy.prototype.move = function (speed) {
        this.intervalID= setInterval(()=>{
        this.clear()
        this.y+=speed;
        this.draw();
    },levelSpeed)
}