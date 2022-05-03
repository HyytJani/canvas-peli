const canvas =document.getElementById("peli");
const ctx= canvas.getContext("2d");

const kerattavat = []
const keskiviivat=[];
const kuopat=[];
let pisteet=0;
let aika;
let ajastin;
let pelipaalla=false;
let palloaika;
let taso;
let kerattavatAika=Math.random()*3000;
let tieNopeus;
let keskiviivaAika;
let kuoppaAjastin;
let kertoja=3000;
let kuoppaAika=1000+Math.random()*kertoja;
let keratty=1;
let fuel=0;
const kuva= document.getElementById('auto')
let pelaaja;
let viivaAika;

document.querySelector('#aloita').disabled=false;

function aloita(){
    aika=40;
    fuel=0;
    taso=6;
    pisteet=0;
    pelaaja=new Pelaaja(canvas.width/2-25,canvas.height-125,70,110,'red',0,0,4)
    tieNopeus=1.5;
    keskiviivaAika=4000;
    nollaaListat();
    kaynnista();    
}
function kaynnista(){
    pelipaalla=true;
    document.querySelector('#aloita').disabled=true    
    lisaakerattava();
    kello(); 
    paivita(); 
    lisaakuoppa(); 
    lisaaKeskiviiva();
}
function lopeta(){   
    pelipaalla=false;
    aikaStop();
    document.querySelector('#aloita').disabled=false;
    ctx.beginPath();
    ctx.font='30px serif';
    ctx.fillStyle='RED';
    ctx.fillText('PELI PÄÄTTYI',50,200)
    ctx.fill() 
        window.location.reload();
}
function kello(){
    aika=aika-1;
    ajastin = setTimeout('kello()',1000)    
}
class Kerattava{
    constructor(x,y,radius,vari,dx,dy,){
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
        ctx.font='18px serif';
        ctx.fillStyle='yellow';
        ctx.fillText('Fuel',this.x-16,this.y+6)
        this.y += this.dy;
    }
}
function lisaakerattava(){
       palloaika= setInterval(() => {   
           kerattavat.push(new Kerattava(40+Math.random()*(canvas.width-90),-50,20,'red',0,tieNopeus))              
      },kerattavatAika);  
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
    ctx.drawImage(kuva,this.x,this.y,this.width,this.height);  
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
}
}
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
           keskiviivat.splice(index,1);}}  )}   
}
function lisaaKeskiviiva(){ 
    viivaAika=setInterval(()  =>{     
    keskiviivat.push(new Keskiviiva(0.25*canvas.width,-50,4,50,0,tieNopeus,'white'))
    keskiviivat.push(new Keskiviiva(0.5*canvas.width,-50,4,50,0,tieNopeus,'white'))
    keskiviivat.push(new Keskiviiva(0.75*canvas.width,-50,4,50,0,tieNopeus,'white'))
    console.log('ei')
},keskiviivaAika)
}
function paivita(){
if(pelipaalla){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
    requestAnimationFrame (paivita);
    loppu();
    tasot();  
    osuma();
    pelinTulostus();
    pelaaja.tulosta();}
}
function pelinTulostus(){
    keskiviivat.forEach((keskiviiva)=>{
        keskiviiva.tulosta()        })
    kuopat.forEach((kuoppa)=>{
            kuoppa.tulosta()        })
    kerattavat.forEach((kerattava)=>{
        kerattava.tulosta()        })        
        ctx.beginPath();
        ctx.font='30px serif';
        ctx.fillStyle='yellow';
        ctx.fillText(aika,50,50);
        ctx.fillText('SEURAAVA TASO',320,50);
        ctx.fillText(fuel+'/'+taso,520,80)
        ctx.fill()
        document.querySelector("#pisteet").innerHTML=pisteet+' PISTETTÄ';    }

function osuma(){
    kerattavat.forEach((kerattava,index)=>{
        if(kerattava.y+kerattava.radius>=pelaaja.y&&kerattava.x+kerattava.radius>=pelaaja.x&&kerattava.x-kerattava.radius<=pelaaja.x+pelaaja.width){
            kerattavat.splice(index,1);
            document.getElementById('palloaani').play()
           
            pisteet=pisteet+keratty; 
            fuel++;                  
        }else if(kerattava.y-kerattava.radius>=canvas.height){
            kerattavat.splice(index,1);
        }
    }) 
    kuopat.forEach((kuoppa,index)=>{
        if(kuoppa.y>=pelaaja.y&&kuoppa.y<=pelaaja.y+pelaaja.height &&kuoppa.x>=pelaaja.x&&kuoppa.x<=pelaaja.x+pelaaja.width){
            tormays();               
        }
        else if(kuoppa.y-kuoppa.radius>=canvas.height){
            kuopat.splice(index,1);
        }    })    
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
function pysayta(){
    if(pelipaalla==true){
    aikaStop();
    ctx.beginPath();
    ctx.font='30px serif';
    ctx.fillStyle='RED';
    ctx.fillText('PAINA UUDESTAAN PYSÄYTÄ PELI!',50,200)
    ctx.fill(); 
    } else if(pelipaalla==false){
        kaynnista();
    }
}
function loppu(){
    if(aika<=0){
        aikaStop();
        document.querySelector('#aloita').disabled=false;
        ctx.beginPath();
        ctx.font='30px serif';
        ctx.fillStyle='RED';
        ctx.fillText('PELI PÄÄTTYI',50,200)
        ctx.fill()         
    }}
function tormays(){        
    aikaStop();
    document.querySelector('#aloita').disabled=false;
    ctx.beginPath();
    ctx.font='30px serif';
    ctx.fillStyle='RED';
    ctx.fillText('PELI PÄÄTTYI',50,200)
    ctx.fill()
    setTimeout(() => {
        aika=0;}, 1000);
    }
function tasot(){
    if(fuel==taso){
        pisteet=aika+pisteet;              
        nollaaListat();
        aikaStop()
        keratty++ 
        taso=12;
        kertoja=kertoja-40; 
        setTimeout(() => {
                kaynnista();
            }, 3000);
        ctx.beginPath();
        ctx.font='30px serif';
        ctx.fillStyle='blue';
        ctx.fillText('SEURAAVA TASO',195,200); 
        ctx.fill();
        aika=40;
        fuel=0;          
        tieNopeus=tieNopeus+0.2;
        keskiviivaAika=keskiviivaAika-50;  }    
    }
class Kuoppa{
    constructor(x,y,radius,vari,dx,dy,){
        this.x=x
        this.y=y
        this.radius=radius
        this.vari=vari
        this.dx=dx
        this.dy=dy          
        }      
    tulosta(){ 
        let gradient=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(1, ' rgb(40, 39, 39)'); 
        ctx.beginPath();           
        ctx.fillStyle=gradient;       
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);          
        ctx.fill();
        this.y += this.dy;
        }  
      }
function lisaakuoppa(){
           kuoppaAjastin= setInterval(() => {   
               kuopat.push(new Kuoppa(40+Math.random()*(canvas.width-90),-50,20,'',0,tieNopeus))              
          },kuoppaAika);  
    }
function aikaStop(){
        pelipaalla=false;
        clearTimeout(ajastin);
        clearInterval(palloaika);
        clearInterval(kuoppaAjastin);
        clearInterval(viivaAika);
    }
function nollaaListat(){
    kerattavat.splice(0,kerattavat.length)
    keskiviivat.splice(0,keskiviivat.length)
    kuopat.splice(0,kuopat.length)
}
    
