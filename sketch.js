const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,ladrillo,ground;
var ladrillo_con;
var ladrillo_con_2;

var bg_img;
var ladrillo_img;

var grua,grua_img;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;

function preload()
{
  bg_img = loadImage('background.png');
  ladrillo_img = loadImage('brick.png');
  grua_img = loadImage("GHC55.png")

  bk_song = loadSound('sound1.mp3');
  cut_sound = loadSound('rope_cut.mp3');

}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  grua = createImg(grua_img);
  grua.position(50,50);
  grua.size(40,40);
  grua.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  ladrillo = Bodies.rectangle(300,300,50,50);
  Matter.Composite.add(rope.body,ladrillo);

  ladrillo_con = new Link(rope,ladrillo);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(ladrillo!=null){
    image(ladrillo_img,ladrillo.position.x,ladrillo.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

}

function drop()
{
  rope.break();
  ladrillo_con.detach();
  ladrillo_con = null; 
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}