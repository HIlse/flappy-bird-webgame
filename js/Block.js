function Block()
{
    this.X = 300;    
    this.botY = 0;  
    this.topY = 0;    
    this.time = 0;
    this.passed = false;
    this.passSound = new sound("sounds/sfx_point.mp3");
    
    this.drawBlock = function()
    {
        this.time ++;
        if (!over && start)
        this.X -=1.6;
        ctx.drawImage(images["bot"],this.X,this.botY,52,320);
        ctx.drawImage(images["top"],this.X,this.topY,52,320);
    }   
    
}