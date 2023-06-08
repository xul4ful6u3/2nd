let points = [[0.5, -3], [-0.5, -8], [0, -9],[1,-9.5],[2,-9.5],
[2,-8.5],[1,-7.5],[4,-3],[6,-3],[14,-10],[15,-10],[16,-9],
[15.5,-8],[15,-8],[11,-4],[10,0],[10.5,2],[12,3.5],[14,3],[15,4],
[15,5],[14,6.5],[13.5,7.5],[12.5,8],[11.5,9.5],[10,8],[8,7],
[6,5.5],[4,5.6],[0,6.5],[-6,7.5],[-9,7],[-10,7],[-12,9],[-12.5,11],
[-12.5,12.5],[-11,14],[-10,14.2],[-9.5,13.5],[-9,13.5],[-9,15],
[-10,16],[-11,16.5],[-13,16],[-15,14],[-15.3,12.6],[-15,10],
[-14,7],[-12.5,5],[-13,0],[-16,-3],[-17,-7],[-16,-9],[-15,-9],
[-15,-8],[-15.5,-7.5],[-15,-5],[-10.5,-3],[-10,-4],[-11,-6],
[-8,-9.5],[-6,-10],[-5,-9],[-5.5,-8.5],[-6.2,-8.5],[-8,-6],
[-7,-5.5],[-6,-3],[-2,-2],[0.5, -3],[-0.5, -8]]

let backgroundImage;
var fill_colors = "355070-463f3a".split("-").map(a=>"#"+a)

//設定貓咪物件
var cat //目前要處理的物件，暫時放在cat變數內
var cats = [] //產生所有的物件，為物件的倉庫
//設定子彈物件
var bullet //目前要處理的物件，暫時放在bullet變數內
var bullets = [] //產生所有的物件，為物件的倉庫
//設定怪獸物件
var monster //目前要處理的物件，暫時放在monster變數內
var monsters = [] //產生所有的物件，為物件的倉庫
//設定砲台位置
var shipP
var score = 0

function preload(){
  cat_sound = loadSound("cat.mp3") //加入海豚音效
  bullet_sound = loadSound("boom.mp3") //加入砲台音效
  backgroundImage = loadImage("background.jpg"); //加入背景
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(windowWidth/2, windowHeight/2)
  for(var i=0; i<10; i=i+1){
    cat = new Obj({}) //產生一個新的Obj class元件
    cats.push(cat) //把dophin物件放到dophins陣列內
  }
  for(var i=0; i<20; i=i+1){
    monster = new Monster({}) //產生一個新的Obj class元件
    monsters.push(monster) //把monster物件放到monsters陣列內
  }
}

function draw() {
  background(backgroundImage);
  // for(var j=0; j<cats.length; j=j+1){
  //   cat = cats[j]
  //   cat.draw()
  //   cat.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){ //按鍵盤左鍵或是"a"
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowRight" || key=="b"){  //按鍵盤右鍵或是"b"
      shipP.x = shipP.x + 5
    }
    if(key=="ArrowUp" || key=="w"){  //按鍵盤上鍵或是"w"
      shipP.y = shipP.y - 5
    }
    if(key=="ArrowDown" || key=="s"){  //按鍵盤下鍵或是"s"
      shipP.y = shipP.y + 5
    }
  }

  for(let cat of cats){ //貓咪顯示
    cat.draw()
    cat.update()
    for(let bullet of bullets){ //檢查每一物件
      if(cat.isDOPHINInRanger(bullet.p.x,bullet.p.y)){
        cats.splice(cats.indexOf(cat),1)
        bullets.splice(bullets.indexOf(bullet),1) //從倉庫cats取出被滑鼠按到的物件編號(cats.indexOf(dophin))，只取1個
        score = score - 1
        cat_sound.play()
    }
  }
 }

  for(let bullet of bullets){ //飛彈顯示
    bullet.draw()
    bullet.update()
 }

  for(let monster of monsters){ //怪獸顯示
    if(monster.dead == true && monster.timenum>10){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一物件
      if(monster.isDOPHINInRanger(bullet.p.x, bullet.p.y)){
        // monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(monster),1) //從倉庫dophins取出被滑鼠按到的物件編號(dophins.indexOf(dophin))，只取1個
        score = score + 1
        monster.dead = true //代表怪獸死掉
        // cat_sound.play()
    }
  }
}

  textSize(30)
  text(score,50,50)
  push() //重新規劃原點(0,0)在視窗正中心
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#e63946")
    stroke("#780000")
    rotate(angle)
    triangle(-25,25,-25,-25,50,0) //設定三個點，畫成一個三角形
  pop() //恢復原本設定，原點(0,0)回到左上角
}

function mousePressed(){
//產生物件
  // cat = new Obj({
  //   p:{x:mouseX, y:mouseY}}) //產生一個新的Obj class元件
  // cats.push(cat) //把cat物件放到cats陣列內(丟到倉庫)
//=========================================//

//=================刪除物件=================//
// for(let cat of cats){ //檢查每一物件
//   if(dophin.isDOPHINInRanger(mouseX,mouseY)){
//     cats.splice(cats.indexOf(cat),1) //從倉庫cats取出被滑鼠按到的物件編號(cats.indexOf(cat))，只取1個
//     score = score + 1
//   }
// }
//=========================================//

//產生子彈
bullet = new Bullet({}) //滑鼠按下的地方，產生一個新的Bullet class元件
bullets.push(bullet) //把bullet物件放到bullets陣列內(丟到倉庫)
bullet_sound.play()
//=========================================//
}

function keyPressed(){
  if(key==" "){
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  }
  // if(key=="ArrowLeft"){
  //   shipP.x = shipP.x - 5
  // }
  // if(key=="ArrowRight"){
  //   shipP.x = shipP.x + 5
  // }
  // if(key=="ArrowUp"){
  //   shipP.y = shipP.y - 5
  // }
  // if(key=="ArrowDown"){
  //   shipP.y = shipP.y + 5
  // }
}