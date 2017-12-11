window.onload = function() {csssort();};        //loads the function which edits css values when the page is refreshed/loaded
var w = 594;                                    //makes the varible w equal to brief set width
var h = 841;                                    //makes the varible h equal to brief set height
var iw = window.innerWidth;                     //makes the varible w equal the width of the screen
var ih = window.innerHeight;                    //makes the varible h equal the height of the screen
let squareCount = 1;                            //declaring varible INTEGER
let angle = 0;                                  //declaring varible INTEGER
var noiseVal = 0;                               //declaring varible INTEGER
var value = false;                              //declaring varible BOOLEAN
let widthVal = w/2-225;                         //declaring varible REAL
let heightVal = h/2-300;                        //declaring varible REAL
let backgroundVal = 0.0;                        //declaring varible REAL
let backgroundValCount = 0;                     //declaring varible INTEGER
var num = 0;                                    //declaring varible REAL
var rectangleCount = 0;                         //declaring varible INTEGER
var sunClick = false;                           //declaring varible BOOLEAN
var mouseCount;                                 //declaring varible INTEGER
var trueCount = 0;                              //declaring varible INTEGER
var iconCount = 0;                              //declaring varible INTEGER

function setup() {                              //function to set up canvas
  createCanvas(w,h);                            //size of canvas made to size set by brief
  strokeWeight(2);                              //setting stroke weight
  frameRate(10);                                //setting frame rate
}

function draw() {                               //function which is called every frame
    if (mouseY < 100) {                         //if mouse y coordinate is less than 100
      mouseCount = 5;                           //then the varible mouseCount which is used to set frameRate equals 5
    }
    else if (mouseY >= 100) {                   //else if mouse y coordinate is greater or equal to 100
      mouseCount = mouseY/20;                   //then mouseCount is equal to the coordinate divided by 20 (so that it fits into the possible framecount ranges)
    }
    frameRate(mouseCount);                      //frameRate changes depending on the value of mouseCount, which changes depending on mouse y coordinate

    angle += 0.1;                               //setting the angle of rotation
    let sinValueX = sin(angle+noiseVal);        //setting the value to map the x coordinate of the rectangle
    let sinValueY = cos(angle+noiseVal);        //setting the value to map the y coordinate of the rectangle
    let x = map(sinValueX, -1, 1, 0, 400);      //mapping the x coordinate
    let y = map(sinValueY, -1, 1, 0, 400);      //mapping the y coordinate

    if (value == true) {                        //checks if space key has been pressed
      noiseVal = noise(x)*100;                  //adds random angles to the mapped rectangles using perlin noise
    }

    stroke(0,0,0,50);                           //sets stroke as black but low opacity
    fill(x+200,y-100,0,15)                      //sets fill with the red value controlled by x coordinate and green value being controlled by the y coordinate
    backgroundVal = backgroundVal+1/100;        //increments backgroundVal by 0.01
    if (sunClick == true) {                     //checks if enter button has been clicked
      rectangleCount = rectangleCount+1;        //counts how many frames have gone by since button click
      if (rectangleCount < 50 && trueCount <= 1) {//runs code for the first 50 iterations if it's the first time it has been clicked
        fill(0,0,0,rectangleCount)              //changes the fill to black and the opacity increases with each iteration(loop)
        rect(0,0,w,h)                           //creates a rectangle the size of the screen
        var textColorVal = 1-rectangleCount/49; //reverses the counting up to 50 so that it's counting down and divides to fit rgba standard
        document.getElementById("text").style.color = "rgba(238,222,89,"+textColorVal+")"; //changes the opacity of the css text color for id="text"
      }
      else {                                    //once it has been more than 50 frames since button was clicked
        fill(x+200,y-100,0,15)                  //fill changes back to as before
        push();                                 //creates copy
        translate(w/2,h/2)                      //changes grid to middle of page
        scale(0.228)                            //scales down to same size as original sun
        rotate(radians(frameCount));            //rotates according to frame count
        rect(500+x+widthVal,500+y+heightVal,0-x,0-y);//creates mapped rectangle which was set up earlier (adjustments to size and cordinates so that it performs a specific shape)
        pop();                                  //displays original

      }
    }
    else {                                      //if enter button is not clicked
      rect(25+x+widthVal,100+y+heightVal,0-x,0-y);//creates mapped rectangle which was set up earlier (adjustments to size and cordinates so that it performs a specific shape)
      for (var maskCount = 0; maskCount < 360; maskCount++) { //runs loop 360 times, incrementing the amount of rotation each time until a full circle
          fill(0,0,0)                            //fill changes to black
          push();                                //creates copy
          translate(w/2,h/2)                     //changes grid to middle of page
          scale(1.1)                             //scales up to just over original size
          rotate(radians(maskCount));            //rotates according to for iteration
          rect(25+x+widthVal,25+y+heightVal,0-x,0-y);//creates mapped rectangle which was set up earlier (adjustments to size and cordinates so that it performs a specific shape)
          pop();
      }
    }

    backgroundValCount = isOdd(frameCount/100); //checks if framerate divided by 100 is odd e.g. checks if background should be fading in or fading out
    if (backgroundValCount < 1) {               //if it is less than one then it needs to fade in
        backgroundVal = backgroundVal;          //remain the same (counting upwards with frame rate)
    }
    else if (backgroundValCount > 1) {          //if it is greater than 1 than background needs to fade out
      backgroundVal = 2-frameCount/100;         //reverses the count so that it is counting down
    }
    if (frameCount > 200) {                     //after the first 200 frames this message is hidden
      document.getElementById("helptext").style.visibility = "hidden";
    }
    if (frameCount == 250) {                    //if it has been 250 frames
      sunClick = true;                          //change sunClick to true (change to eclipse sketch)
    }
    if (frameCount == 1350) {                   //if it has been 650 frames
      value = true;                             //change value to true (apply perlin noise randomness)
    }
    if (frameCount == 1700) {                   //if it has been 1000 frames
      sunClick = false;                         //change sunClick to true (change to sunset sketch)
    }
    if (frameCount == 2000) {                   //if it has been 1200 frames
      value = false;                            //change sunClick to true (change to natural sizes)
    }
    if (frameCount == 2200) {                   //if it has been 1000 frames
      sunClick = true;                          //change sunClick to true (change to sunset sketch)
    }



}

function keyPressed() {                         //fuction that runs upon clicking of enter key
    if (keyCode === ENTER) {
      if (sunClick == false) {                  //if this varible's value is false (key is unclicked or has been clicked already twice)
          sunClick = true;                      //sunClick equals true
          trueCount = trueCount+1;              //counts the amount of clicks
      } else {
          sunClick = false;                     //turns to false (off) if it's already been clicked on (true)
      }
    }
    else if (keyCode === 32) {                  //if space bar is clicked
      if (value == false) {                     //if this varible's value is false (key is unclicked or has been clicked already twice)
      value = true;                             //value equals true (perlin randomness turned on)
      }
      else {
      value = false;                            //if already clicked turn off
      }
    }
}

function isOdd(num) {                           //function which returns numbers as odd or even (0 or 1)
    return num % 2;
}

function iconopen() {                           //function which is called upon click of instruction button
  iconCount = iconCount+1;                      //counter
  var iconTest = isOdd(iconCount);              //varible given value of the counter in odd or even
  if (iconTest == 1) {                          //if it's odd it is presently off
    document.getElementById("instructions").style.visibility = "visible"; //make the instructions visible
  }
  else {                                        //if it's even then it is already on
    document.getElementById("instructions").style.visibility = "hidden"; //hide then instructions
  }
}


function csssort() {                            //function which is called upon loading the page it contains all css values that need to be responsive
    document.getElementById("everything").style.height = h + "px"; //setting the height of the background as the height of canvas
    document.getElementById("everything").style.width = w + "px";  //setting the width of the background as the width of canvas
    document.getElementById("everything").style.marginLeft = iw/2-w/2-8+"px"; //placing element in the middle of the page
    document.getElementById("text").style.marginLeft = iw/2-100 + "px"; //placing element in the middle of the page
    document.getElementById("text").style.marginTop = h-100 + "px"; //placing element at the bottom of the page

    var audio = new Audio('content/space.mp3');         //calls the mp3
    audio.play();                               //plays the mp3
  }
