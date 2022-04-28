// Game constants & Variables
var inputDir = {x:0,y:0};
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio ("../music/move.mp3");
const musicSound =new Audio("../music/music.mp3");
let board = document.getElementById('board');
let speed =10;
let score =0 ;
let lastPaintTime = 0;
let snakeArr = 
[
    {x:13,y:15}
];



food = {x:6,y:7};

//Game Functions

function main(ctime)
{
   
    window.requestAnimationFrame(main);
    
    console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed)
    {
      return;
    }
   
    lastPaintTime = ctime;
    
    gameEngine();
   
}

function isCollide(snakeArr)
{
    // if you bump into yourself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[0].x===snakeArr[i].x &&snakeArr[0].y===snakeArr[i].y)
        {
            return true;
        }
      
    }
    // if you bump into the wall
    if(snakeArr[0].x>=25 || snakeArr[0].x<0 || snakeArr[0].y >=25 || snakeArr[0].y < 0)
    {
        return true;
    }
    return false;
  
}

// function for game
function gameEngine()
{
    //Part 1: Updating the snake array
    if(isCollide(snakeArr))
    {
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
    }

    // if you have eaten the food ,increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x === food.x)
    {
        foodSound.play();
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : "+score;
       
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y+inputDir.y });
        let a= 2;
        let b= 23;

        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};

    }

    //Move the Snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    // Part2: Display the snake and Food
    //Display the snake

    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index==0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);


    });



    //Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}
















// Main logic here
let hiscore = localStorage.getItem("hiscore");
if(hiscore=== null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
  
}
else
{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: "+ hiscore;

}

// using window.requestAnimationFrame instead of setinterval and settimeout is better option
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{


   //Start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp": 
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y =-1;
            break;
            
            case "ArrowDown": 
            console.log("ArrowDown");
            inputDir.x =0;
            inputDir.y = 1;
            break;
            
            case "ArrowLeft": 
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            
            case "ArrowRight": 
            console.log("ArrowRight");
            inputDir.x =1 ;
            inputDir.y = 0;
            break;

            default:
                break;
        
    }

});