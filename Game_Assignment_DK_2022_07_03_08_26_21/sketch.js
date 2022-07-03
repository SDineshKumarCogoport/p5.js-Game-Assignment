//Game Assignment
//Dineshkumar Subramanian


//ball parameters
let ball_x,ball_y,ball_dx,ball_dy;

//paddle parameters
let paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx;

//life
let life=3;

//score
let score=0;

//Obstacle obsgrid
let obsgrid=[];
let nx=5;
let ny =4;

function setup() {
  
  //Creating Canvas
  createCanvas(600, 600);
  
  //ball properties
  ball_x=width/2;
  ball_y=height/2;
  ball_dx=5;
  ball_dy=4;
  ball_d = 30;
  
  //paddle properties
  paddle_width = 120;
  paddle_height =25;
  paddle_x=width/2-paddle_width/2;
  paddle_y =height-20;
  paddle_dx=5;
  
  // Creating Obstacle blocks
  for(var i=0;i<ny;i++){
    let row=[];
    for(var j=0;j<nx;j++){
      let brick=[];
      brick.x = (i*(width/5))+(width/8);
      brick.y = (j*(height/18))+(height/8);
      brick.w = ((width/5)-(width/12));
      brick.h = ((height/15)-(height/30));
      brick.v = true;
      row.push(brick);
    }
    obsgrid.push(row);    
  }
}

function draw() {
  
  background("#FDF8AC");
  
  //Drawing the ball and paddle
  noStroke();
  fill("#008870");
  circle(ball_x,ball_y,ball_d);
  rect(paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx);
  
  //move ball
  ball_x+=ball_dx;
  ball_y+=ball_dy;
  
  
//Drawing the obstcle grid
  for(var i=0;i<ny;i++){
    for(var j=0;j<nx;j++){
      
      noStroke();
      fill("#B10163");
      rect(obsgrid[i][j].x,obsgrid[i][j].y,obsgrid[i][j].w,obsgrid[i][j].h);
      
//Detecting collisions and incrementing the scores
      
      if(ball_x-(ball_d/2)<obsgrid[i][j].x+obsgrid[i][j].w && 
         ball_y >obsgrid[i][j].y && ball_y <obsgrid[i][j].y +obsgrid[i][j].h&& ball_x +(ball_d/2)>obsgrid[i][j].x)
      {
        obsgrid[i][j].h=0;
        obsgrid[i][j].w=0;
        ball_dx=-ball_dx;
        score++;
      }
      
      if(ball_y-(ball_d/2)<obsgrid[i][j].y+obsgrid[i][j].h && 
         ball_x >obsgrid[i][j].x && ball_x <obsgrid[i][j].x +obsgrid[i][j].w && ball_y +(ball_d/2)>obsgrid[i][j].y){
        ball_dy=-ball_dy;
        score++;
        obsgrid[i][j].h=0;
        obsgrid[i][j].w=0;
      }
    }
  }
  
  //Controlling the paddle and restricting the ball within the boundaries
  
  if(keyIsDown(RIGHT_ARROW) && paddle_x+paddle_width<width){
    paddle_x+=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW) && paddle_x>0){
    paddle_x-=paddle_dx;
  }
  if(ball_x+(ball_d/2)>width || ball_x-(ball_d/2)<0){
    ball_dx=-(ball_dx);
  }
  if(ball_y-(ball_d/2)<0){
    ball_dy=-(ball_dy);
  }
  if(ball_y+(ball_d/2)>=height-20){
    if(ball_x+(ball_d/2)>=paddle_x && ball_x-(ball_d/2)<=paddle_x+paddle_width){
      ball_dy=-(ball_dy);
    }
    
  // Decreasing the life if the ball reaches the bottom of the canvas
    
    if(ball_y+(ball_d/2)>height){
      ball_dx=0;
      ball_dy=0;
      
      if(life>1){
        life--;
        setup();
      }
      text("Game Over!",width-370,height/2);
      text("Your Score: "+ score , width-380,height/1.75);
      
    }
    
  } 

  // Displaying the score and life
  //Ending the game.
  
  if(score == nx*ny ){
    
     ball_dx =0;
     ball_dy =0;
    paddle_x=width/2-paddle_width/2;
    paddle_y =height-20;
    paddle_dx =0;
    text("Level Completed! ", width-380,height/2);
    
     }
  else{
    
  textSize(24);
  text("Life "+ life, width-(width/1.15),48);
  text("Score : "+ score , width-(width/3.2),48);
    
  }
}