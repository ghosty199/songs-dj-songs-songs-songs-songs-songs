function preload(){
    song=loadSound("music.mp3")
}

function setup(){
    canvas=createCanvas(600,450)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelloaded)
    poseNet.on('pose',gotPoses)
}
var rightWristX=0
var rightWristY=0
var leftWristX=0
var leftWristY=0
var scoreRightWrist=0
var scoreLeftWrist=0
var song=""

function modelloaded(){
    console.log("modelloaded")
}
function gotPoses(results){
console.log(results)
if (results.length>0) {
    scoreRightWrist=results[0].pose.keypoints[10].score
    scoreLeftWrist=results[0].pose.keypoints[9].score
    rightWristX=results[0].pose.rightWrist.x
    rightWristY=results[0].pose.rightWrist.y
    leftWristX=results[0].pose.leftWrist.x
    leftWristY=results[0].pose.leftWrist.y

}
}
function draw(){
image(video,0,0,600,500)
fill ("red")
stroke("red")
if (scoreRightWrist>0.2) {
    circle(rightWristX,rightWristY,20)
    if (rightWristY>0 && rightWristY<100) {
        document.getElementById("speednumber").innerHTML="speed=0.5x"
        song.rate(0.5)
        
    }
    if (rightWristY>100 && rightWristY<200) {
        document.getElementById("speednumber").innerHTML="speed=1x"
        song.rate(1)
        
    }
    if (rightWristY>200 && rightWristY>300) {
        document.getElementById("speednumber").innerHTML="speed=1.5x"
        song.rate(1.5)
        
    }
    if (rightWristY>300 && rightWristY<400) {
        document.getElementById("speednumber").innerHTML="speed=2x"
        song.rate(2)
        
    }
    if (rightWristY>400 && rightWristY<500) {
        document.getElementById("speednumber").innerHTML="speed=2.5x"
        song.rate(2.5)
        
    }
}
if (scoreLeftWrist>0.2) {
    circle(leftWristX,leftWristY,20)
    num=Number(leftWristY)
    numY=floor(num*2)
    newNumY=numY/1000
    document.getElementById("volumenumber").innerHTML="volume"+newNumY
    song.setVolume(newNumY)
    
}
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}