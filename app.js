const can = document.getElementById("cv");

/** @type{CanvasRenderingContext2D}
 */
const ctx = can.getContext("2d");

can.width =  854;
can.height = 480;

//DaltaTime Wannabe
let lastFrameTime = performance.now();  // ใช้คำนวณ deltatime

//Player OBJ and Value Set
let Player_OBJ = new Sprite_OBJ(50,380,82,82,ctx,"./image/plane.png");
Player_OBJ.OffSetX = 8;
Player_OBJ.OffSetW = -20;
Player_OBJ.OffSetY = 25;
Player_OBJ.OffSetH = -50;

//Object
let BG_obj = new Sprite_OBJ(0,0,can.width,can.height,ctx,"./image/BG.png");

let tobj = [new Cloud(0 , 50 , 100 , 100 , ctx , "./image/Cloud_1.png" , 350) ,
new Cloud(300 , 50 , 100 , 100 , ctx , "./image/Cloud_2.png" , 350),
new Cloud(600 , 50 , 100 , 100 , ctx , "./image/Cloud_1.png" , 350),
new Cloud(800 , 50 , 100 , 100 , ctx , "./image/Cloud_2.png" , 350)];

let tree = new tree_OBJ(854,380,82,82,ctx,"./image/tree.png" , 400);
tree.OffSetX = 10;
tree.OffSetW = -20;

//GameEvent
let Score = 0 , MaxScore = 0;
let GameTime = 0 , Second = 0;

//KeyboardEvent
let jump = false;

document.addEventListener("keydown" , function(e)
{
    if(e.key == " " && !GameOver && Player_OBJ.y >= 379) 
    {
        jump = true;
    }
    else if(e.key == " " && GameOver) reset();
});

//WindowStart
window.onload = function()
{
    requestAnimationFrame(update);
}

//Drawing per frame
function Drawing()
{
    BG_obj.drawME();

    Player_OBJ.drawME();
    //Player_OBJ.DrawStrokeBox();

    tree.drawME();
    //tree.DrawStrokeBox();

    for(let i = 0; i < tobj.length;i++) tobj[i].drawME();
}

//Value MainGame
let GameOver = false;

function update(Time)
{
    let deltatime = (Time - lastFrameTime) / 1000;
    lastFrameTime = Time;
    ctx.clearRect(0,0,can.width,can.height);

    Drawing();

    DrawText("Score : " + Math.floor(Score) , 10 , 40 , "30px" , "white");
    if(MaxScore > 0) DrawText("Max Score : " + Math.floor(MaxScore) , 10 , 80 , "30px" , "white");

    if(!GameOver)
    {
        Second += deltatime;
        if(Second > 1)
        {
            Second = 0;
            GameTime += 1;
        }

        if(GameTime > 3)
        {
            GameTime = 0;
            tree.speed += 100;
        }

        Score += deltatime;
        for(let i = 0; i < tobj.length;i++) tobj[i].update(deltatime);

        //if(Player_OBJ.y <= 380) Player_OBJ.y += 100 * deltatime;
        PlayerJump(deltatime);
        tree.update(deltatime);
        if(isColliding(Player_OBJ.BoxCollider() , tree.BoxCollider())) GameOver = true;
    }
    else
    {
        DrawText("Game Over" , (can.width / 2) - 250, (can.height / 2)  - 25, "100px" , "Red");
        DrawText("Press Spacebar to Restart" , (can.width / 2) - 205, (can.height / 2) + 30, "35px" , "white");
    }

    requestAnimationFrame(update);
}

function reset()
{
    if(Score > MaxScore) MaxScore = Score;
    Score = 0;
    GameTime = 0;
    Second = 0;
    Player_OBJ.y = 380;
    tree.x = 854;
    tree.speed = 400;
    jump = false;

    GameOver = false;
}

function isColliding(obj1 , obj2) 
{
return (
    obj1.x <= obj2.x + obj2.w &&
    obj1.x + obj1.w >= obj2.x &&
    obj1.y <= obj2.y + obj2.h &&
    obj1.y + obj1.h >= obj2.y);
}

function DrawText(theText , posX , posY , Size , color)
{
    ctx.beginPath();
    ctx.font = "normal normal " + Size + " Arial";
    ctx.fillStyle = color;
    ctx.fillText(theText , posX, posY);
    ctx.strokeStyle = "black";
    ctx.strokeText(theText , posX, posY);
    ctx.closePath();
}

function PlayerJump(DeltaTime)
{
    if(jump)
    {
        Player_OBJ.y -= 380 * DeltaTime;
        if(Player_OBJ.y <= 230) 
        {
            Player_OBJ.y = 230
            jump = false;
        }
    }
    else
    {
        Player_OBJ.y += 400 * DeltaTime;
        if(Player_OBJ.y >= 380 && !jump) Player_OBJ.y = 380;
    }
    
}