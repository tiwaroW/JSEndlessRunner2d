class Sprite_OBJ
{
    myImage = new Image()
    x = 0
    y = 0
    h = 0
    w = 0
    ctx = null

    OffSetX = 0;
    OffSetY = 0;
    OffSetW = 0;
    OffSetH = 0;

    constructor(x,y,w,h,c,pathIMage)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = c;
        this.myImage.src = pathIMage;
    }

    DrawStrokeBox()
    {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.x + this.OffSetX, this.y + this.OffSetY , this.w + this.OffSetW , this.h + this.OffSetH )
    }

    BoxCollider()
    {
        return{
            x : this.x + this.OffSetX,
            y : this.y + this.OffSetY,
            w : this.w + this.OffSetW,
            h : this.h + this.OffSetH
        };
    }

    drawME()
    {
        this.ctx.drawImage(this.myImage , this.x , this.y , this.w , this.h);
    }
}