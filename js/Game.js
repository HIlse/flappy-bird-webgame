function Game()
{
    var birdOb = null;
    var groundOb = null;
    var blockOb = null;
//    var touchGround = false;
    var rotSpeed = 2*Math.PI/180;
    var score = 0;
    
    
    var sources = {};    
   
    
    
    this.init = function()
    {
        birdOb = new Bird();
        groundOb = new Ground();
        blockOb = new Array();
        
        touchGround = false;        
        rotSpeed = 2*Math.PI/180;
        score = 0;
        start = false;
        over = false;
        
        
        
        sources = 
            {
                BGI: 'images/BGI.png',
                birdImg: 'images/bird.png',
                groundImg: 'images/ground.png',
                bot: 'images/bot.png',
                top: 'images/top.png'
            };
        loadImages(sources);
        
        for( i = 1; i<5; i++)
            {
                blockOb[i] = new Block();
                blockOb[i].botY = Math.round(150 + Math.random()*200);
                blockOb[i].topY = blockOb[i].botY - 100-320;
                if(i==1) blockOb[i].X = 400;
                else
                blockOb[i].X = blockOb[i-1].X + 144;
            }
    }
    
    this.update = function()
    {
        if(over && clicked && touchGround) gGame.init();
        for( i = 1; i<5; i++)
            {
                if(i==1)
                 {
                     if(blockOb[i].X + 52 <= 0)
                         {
                         blockOb[i].X = blockOb[4].X + 144;
                        blockOb[i].botY = Math.round(150 + Math.random()*200);
                        blockOb[i].topY = blockOb[i].botY - 100-320;

                             blockOb[i].passed = false;

                         }
                 }
                else
                    {
                        if(blockOb[i].X+52 <=0)
                            {
                            blockOb[i].X = blockOb[i-1].X + 144;
                            blockOb[i].botY = Math.round(150 + Math.random()*200);
                            blockOb[i].topY = blockOb[i].botY - 100-320;

                                blockOb[i].passed = false;

                            }
                    }     
            }
        
        if(birdOb.bounceSpeed > 0 && start)
            {
                rotSpeed=2*Math.PI/180;
                birdOb.angle -= 20 * Math.PI / 180; 
                if(birdOb.angle <= -30*Math.PI/180)
                    birdOb.angle = -30*Math.PI/180;
            }
        else if (start)
            {
                birdOb.angle += rotSpeed; 
                rotSpeed += 0.0017;
                if(birdOb.angle >= 90*Math.PI/180)
                    birdOb.angle = 90*Math.PI/180;
            }

        if (clicked && !birdOb.dead && !over)
            {
                birdOb.swing();
                birdOb.bounceSpeed = 6;
                clicked =false;
                start = true;
            }
        
        if(birdOb.Y - 12.5 + 30 >= 400)
            {
                birdOb.Y  = 400 +12.5 -30;
                if(!birdOb.hitGroundPlayed)
                    {
                        birdOb.hitGroundSound.play();
                        birdOb.hitGroundPlayed = true;
                    }
                touchGround = true;
                over = true;

                

            }
         for(n=1;n<5;n++)
        {
            var crash = false; 
            
                       
            if((birdOb.X-18 + 32 >= blockOb[n].X) &&
                (birdOb.X-18 +4 <= blockOb[n].X + 52) &&
                (birdOb.Y-12.5 +4 <= blockOb[n].topY + 320||
                birdOb.Y-12.5 +21 >= blockOb[n].botY))
                {
                    if(!birdOb.hitPlayed)
                        {
                            birdOb.hitSound.play();
                            birdOb.hitPlayed = true;
                        }
                    crash = true;
                    
                }
            if(!crash &&
                birdOb.X > blockOb[n].X + 26 & !blockOb[n].passed)
                {
                    blockOb[n].passSound.play();
                    score++;
                    blockOb[n].passed = true;
                }
            
            if (crash)
                {
                    over=true;
                }
            
        }
        
        
    }
    
    this.render = function()
    {
        ctx.drawImage(images["BGI"], 0,0);
        for (j = 1; j< 5; j++)
            {
                blockOb[j].drawBlock();
            }
        groundOb.drawGround();
        birdOb.drawBird();
        if(!start)
            {
                ctx.font = "20px Impact ";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("Click to start!",canvas.width/2, canvas.height/2);
            }
   
    
        ctx.font = "40px Impact ";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(score,canvas.width/2, 100);
        
        if(over && touchGround)
            {
                ctx.font = "40px Impact ";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2);
                ctx.font = "20px Impact ";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("Click to restart!",canvas.width/2, canvas.height/2 + 40);
            }
    }
    
    this.destroy = function()
    {
        
    }
}