const canvas =document.getElementById("peli");
const ctx= canvas.getContext("2d");

const kerattavat = []
const keskiviivat=[]
let pisteet=0;
let aika=60;
let ajastin;

function aloita(){
    lisaakerattava();
    kello();
    
   
    ctx.font='30px Arial';
    ctx.fillStyle='red';
    ctx.fillText('mitä',100,20)
   
}
function lopeta(){
        window.location.reload();
}
function kello(){
    aika=aika-1;
    ctx.beginPath();
   
    ctx.font='30px Arial';
    ctx.fillStyle='white';
    ctx.fillText('mitä',380,20)
   ctx.fill();
    console.log(aika)
    ajastin = setTimeout('kello()',1000)
}

class Kerattava{
    constructor(x,y,radius,vari,dx,dy){
        this.x=x
        this.y=y
        this.radius=radius
        this.vari=vari
        this.dx=dx
        this.dy=dy    
    }
    

    tulosta(){
        ctx.beginPath(); 
          
        ctx.fillStyle=this.vari;       
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);          
        ctx.fill();
        this.y += this.dy;
    }
}
function lisaakerattava(){
      setInterval(() => {   
           kerattavat.push(new Kerattava(40+Math.random()*(canvas.width-90),-50,20,'blue',0,1))              
      },2000);  
}
class Pelaaja {
    constructor(x,y,width,height,vari,dx,dy,nopeus){
        this.x=x
        this.y=y
        this.width=width
        this.height=height
        this.vari=vari
        this.dx=dx
        this.dy=dy
        this.nopeus=nopeus
    
}

tulosta(){     
    ctx.beginPath(); 
     
    this.aste=0;   
    ctx.fillStyle=this.vari;
    ctx.fillRect(this.x,this.y,this.width,this.height);  
    this.x += this.dx;
}
moveRight(){
    if(this.x+this.width>=canvas.width){
        this.dx=0
        
    }else{
       
    this.dx= this.nopeus;}
}
moveLeft(){
    if(this.x<=0){
        this.dx=0;
        
    }else{
    this.dx= -this.nopeus;
    }
}
pysayta(){
    this.dx=0;
  ;   
}
}
const pelaaja=new Pelaaja(canvas.width/2-25,canvas.height-110,50,100,'red',0,0,2)

class Keskiviiva{
    constructor(x,y,width,height,dx,dy,vari){
    this.x=x
    this.y=y
    this.width=width
    this.height=height
    this.dx=dx
    this.dy=dy
    this.vari=vari
}
tulosta(){
    ctx.beginPath();    
    ctx.fillStyle=this.vari;
    ctx.fillRect(this.x,this.y,this.width,this.height);  
    this.y += this.dy;
   keskiviivat.forEach((keskiviiva,index)=>{
       if(keskiviiva.x>=canvas.height){
           keskiviivat.splice(index,1);
       }
   }
        
   )}   
}
function lisaaKeskiviiva(){
    setInterval(() => {     
    keskiviivat.push(new Keskiviiva(0.25*canvas.width,-50,4,50,0,1,'white'))
    keskiviivat.push(new Keskiviiva(0.5*canvas.width,-50,4,50,0,1,'white'))
    keskiviivat.push(new Keskiviiva(0.75*canvas.width,-50,4,50,0,1,'white'))
}, 8000);
}
lisaaKeskiviiva();
function paivita(){
ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
pelinTulostus();
pelaaja.tulosta();
document.querySelector("#pisteet").innerHTML=pisteet+' PISTETTÄ';
requestAnimationFrame (paivita);
osuma();
}
paivita();

function pelinTulostus(){
    keskiviivat.forEach((keskiviiva)=>{
        keskiviiva.tulosta()
        })
    kerattavat.forEach((kerattava)=>{
        kerattava.tulosta()
        })}
function osuma(){
    kerattavat.forEach((kerattava,index)=>{
        if(kerattava.y+kerattava.radius>=pelaaja.y&&kerattava.x+kerattava.radius>=pelaaja.x&&kerattava.x-kerattava.radius<=pelaaja.x+pelaaja.width){
            kerattavat.splice(index,1);
            pisteet++
            
        }
        else if(kerattava.y-kerattava.radius>=canvas.height){
            kerattavat.splice(index,1);
        }
    })      
}
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    
    if(e.key==='ArrowRight'){
        pelaaja.moveRight();
    }else if(e.key==='ArrowLeft'){
        pelaaja.moveLeft();
    }
}
function keyUp(e){
    
    if(e.key==='ArrowRight'||
       e.key==='ArrowLeft'){
       pelaaja.pysayta()       
    }
}


   
