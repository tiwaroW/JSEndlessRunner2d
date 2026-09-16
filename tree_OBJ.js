class tree_OBJ extends Sprite_OBJ
{
    speed = 2;
    MaxX = 0;

    constructor(x,y,w,h,c,pathIMage,Speed)
    {
        super(x,y,w,h,c,pathIMage);

        this.speed = Speed;
    }

    update(deltatime)
    {
        this.x -= this.speed * deltatime;
        
        if(this.x <= -200) this.x = 1054;
    }
}