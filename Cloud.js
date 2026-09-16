class Cloud extends Sprite_OBJ
{
    speed = 2;

    constructor(x,y,w,h,c,pathIMage,Speed)
    {
        super(x,y,w,h,c,pathIMage);

        this.speed = Speed;
    }

    update(deltatime)
    {
        this.x += this.speed * deltatime;
        
        if(this.x >= 854) this.x = -200;
    }
}