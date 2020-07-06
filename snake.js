document.body.style.zoom="75%";
function init()
{
    food_img_path="./assets/apple.png";
    food_img = new Image();
    food_img.src=food_img_path;

    trophy= new Image();
    trophy.src="./assets/trophy.png";
    fruitctr=1;
    gameover= false;
    score=5;
    cell_size=66;
    buffer=2;
    canvas= document.getElementById("mycanvas");
    W=H=canvas.width=canvas.height=1000;
    x_max= (W/cell_size);
    y_max= (H/cell_size);
    pen= canvas.getContext("2d");
    fruit={x:-1,y:-1};

    snake=
    {
        length:6,
        color:"blue",
        cells:[],
        dir:"right",

        create_snake: function()
                {
                    //console.log(pen)
                    for(let i=this.length;i>0;i--)
                    {
                        this.cells.push({x:i,y:0})
                    }
                },
        draw_snake: function()
        {
            
            for(let i=0;i<this.cells.length;i++)
            {
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*cell_size,cell_size-buffer,cell_size-buffer);
            }

        },
    
        moveSnake: function()
        {
            
            var headCurrent= this.cells[0];
            if(headCurrent.x>=x_max || headCurrent.x<0 || headCurrent.y>=y_max || headCurrent.y<0)
            {       
                gameover=true;   
                return;
            }

            
            //var tail= this.cells.pop();
            var newHead={x:-1,y:-1};
            if(this.dir=="right")
            {
                //console.log("snake.dir",this.dir)
                newHead.x= headCurrent.x+1;
                newHead.y= headCurrent.y;
                this.cells.unshift(newHead);
                headCurrent= newHead;
                
                
                
            }
            else if(this.dir=="down")
            {
                //console.log("snake.dir",this.dir)
                
                newHead.x=headCurrent.x;
                newHead.y=headCurrent.y+1;
                this.cells.unshift(newHead);
                headCurrent=newHead;
                
               
               
                
            }
            else if(this.dir=="up")
            {
                //console.log("snake.dir",this.dir)
                newHead.x=headCurrent.x;
                newHead.y=headCurrent.y - 1;
                this.cells.unshift(newHead);
                headCurrent= newHead;
                
                 
            }

            else if (this.dir="left")
            {
                //console.log("snake.dir",this.dir)
                newHead.x=headCurrent.x-1;
                newHead.y=headCurrent.y;
                this.cells.unshift(newHead);
                headCurrent=newHead;
                
                
                
            }


            var head= snake.cells[0];
            var remaining_body= this.cells.slice(1,);
            if(remaining_body.some(function(o){
                if(head.x==o.x && head.y==o.y){
                    console.log("snake bit itself");
                    gameover=true;
                }
            }));
            if(head.x===fruit.x && head.y===fruit.y)
            {
                console.log("head:",head,",fruit:",fruit);
                console.log("eaten!")
                makefruit();
                score+=1;
                return;
            }
            else{
                let tail= this.cells.pop();
                pen.clearRect(tail.x*cell_size,tail.y*cell_size,cell_size,cell_size);
            }

  
        }
   
    }

    console.log(pen)
    snake.create_snake();

}

function makefruit(){
    console.log(fruitctr++);
    fruit_x= Math.floor((Math.random()*x_max));
    fruit_y= Math.floor(Math.random()*y_max);

    fruit={
        x: fruit_x,
        y: fruit_y,
    };

    if(snake.cells.some(function(o){
        if (o.x === fruit.x && o.y=== fruit.y)
        {
            console.log("food on snake");
            makefruit();
        }

    }));
    pen.fillStyle="red";



}

function draw(){
    //console.log(snake.cells);
    snake.draw_snake();
    pen.drawImage(trophy,19,20,cell_size,cell_size);
    pen.font="20px Roboto";
    pen.drawImage(food_img,fruit.x*cell_size,fruit.y*cell_size,cell_size-buffer,cell_size-buffer);
    pen.fillText(score,50,50);
    

}

function update(){
        snake.moveSnake();
        
        
}

function gameloop(){
    
    if (gameover==true)
    {
        clearInterval(gl);
        let stringalert= "GAMEOVER! Your Score is: "+score;
        window.alert(stringalert);
        return;
    }
    update();
    draw();
    

}

function myfunction(btn)
{
   game_buttons=["ArrowUp","ArrowDown","ArrowRight","ArrowLeft"]
   if(game_buttons.includes(btn.key))
    {
        btn.preventDefault();
    } 
    
    if(btn.key=="ArrowUp" && snake.dir!="down")
    {
        snake.dir="up";
    }
    if(btn.key=="ArrowDown" && snake.dir!="up")
    {
        snake.dir="down";
    }
    if(btn.key=="ArrowLeft" && snake.dir!="right")
    {
        snake.dir="left";
    }
    if(btn.key=="ArrowRight" && snake.dir!="left")
    {
        snake.dir="right"
    }
}
document.addEventListener("keydown",myfunction);


init();
snake.draw_snake();
makefruit();

gl=setInterval(gameloop,100);
    

