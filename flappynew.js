var width = window.innerWidth;;
var height = window.innerHeight;
(function(){
	if(width / height >= 1.77){
		width = height * 1.77;
	} else {
		height = width / 1.77;
	}
})();
var canvas, ctx;
var birdx = (height/3.26);
var birdy = height/2;
var grawity = (height*0.00085);
var skok = -(height*0.015);
var fast = 0;
var odl = (height/1.63);
var now = 0;
var tab = [];
var grow = 0;
var stala = 0;
var druga = 0;
var end = false;
var ter = 0;
var odstep = (height / 3.26);
var mniej = (height / 217.3);
var danger = [[(height/(652/63)),(height/(652/33))], [(height/(652/57)), (height/(652/42))], [(height/(652/48)),(height/(652/45))], [(height/(652/33)),(height/(652/48))], [(height/(652/12)),(height/(652/27))], [(height/(652/30)),(height/(652/12))], [(height/(652/48)), (height/(652/12))], [(height/(652/54)),(height/(652/18))], [(height/(652/15)), (height/(652/21))]];
var img;
var imgptak;
var play = false;
var blok = (height / 13.04);
var birdpos = [(height / 8.693),(height / 10.86)];
var jechanie = (height/81.5);
var ponownie = false;
var sprawdzanie = 0;
var timer;

function newplease()
{
	birdy = height/2;
	fast = 0;
	now = 0;
	tab = [];
	grow = 0;
	stala = 0;
	druga = 0;
	sprawdzanie = 0;
	end = false;
	ter = 0;
	odstep = (height / 3.26);
	play = false;
	ponownie = false;
	var ile = Math.random()*(height*0.45)+20;
		tab.push([ile, odstep]);
		ctx.fillStyle = "#222";
		ctx.fillRect(0,0, width, height);
		setTimeout(gamesub, 20);
}

function start()
{
	//652
	img = document.getElementById("img");
	imgptak = document.getElementById("img-ptak");
	canvas = document.getElementById("can");
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	var ile = Math.random()*(height*0.60)+(height/32.6);
		tab.push([ile, odstep]);
		ctx.fillStyle = "#222";
		ctx.fillRect(0,0, width, height);
		setTimeout(gamesub, 20);
}

function gamesub()
{
	for(var g=0;g<=2;g++){
	ctx.drawImage(img,0,0, 142, 256, (g*width/3), 0, width/3+1, height);
	}
	ctx.drawImage(img, 145, 172, 98, 24, width/2-(98), height/2-80, 98*2, 24*2);
	ctx.drawImage(imgptak, width/2-(23), height/2-20, 46, 37);
	ctx.font = "30px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Kliknij Spację lub myszkę aby zagrać", width/2 - 250, height/2 + 160);
	ctx.fillText("original game/concept/art by dong nguyen, www.dotgears.com", width/2 - 370, height/2 + 230);
}

function falsz(){
	if(grow!= stala){
		if(grow != druga){
			grow = stala;
			druga = stala;
		}
		else if(stala != druga){
			stala = grow;
			druga = grow;
		}
	}
	timer = setTimeout(falsz, 50);
}

function podlicz()
{
	falsz();
	ctx.fillStyle="red";
	ctx.font = "30px Arial";
	if(grow < 0){
		grow = 0;
		stala = 0;
		druga = 0;
	}
	ctx.fillText("Twój wynik: "+grow, width/2-100,height/4 + 100);
	var odczyt;
	if(parseInt(localStorage.getItem("record"), 10) >= 0){
		odczyt = parseInt(localStorage.getItem("record"), 10);
		ctx.fillText("Rekord wynosi: "+odczyt, width/2-120,height/4 + 150);
		if(grow >odczyt){
			localStorage.removeItem("record");
			localStorage.setItem("record", ""+grow);
			ctx.fillText("Gratulacje, pobiłeś rekord", width/2-170,height/4 + 200);
		}
	} else {
		localStorage.setItem("record", ""+grow);
		ctx.fillText("Gratulacje, pobiłeś rekord", width/2-170,height/4 + 200);
	}
	ctx.fillText("Aby zagrać ponownie naciśnij spację albo ekran", width/2-300,height/4 + 230);
	setTimeout(jakos, 300);
}
function jakos()
{
	ponownie = true;
}

function run()
{
	if(end==false){
	loop();
	setTimeout(run, 20);
	} else podlicz();
}
function loop()
{
	for(var g=0;g<=3;g++){
	ctx.drawImage(img,0,0, 142, 256, (g*width/3), 0, width/3+1, height);
	}
	ctx.drawImage(img,357,0, 96, 8, width-96, 20, 96, 8);
	//ptak
	fast += grawity;
	birdy += fast;
	if(birdy+birdpos[1]/2>=height){
		birdy = height - birdpos[1]/2;
		end = true;
		}
	if(birdy + birdpos[1]/2 <= 0)birdy = -(birdpos[1]/2);
	//8,693333333333333;
	ctx.drawImage(img, 260, 60, 25, 20, birdx, birdy,birdpos[0], birdpos[1]);
	now +=jechanie;
	//mur
	if(now >= odl){
		var ile = Math.random()*(height*0.60)+(height/32.6);
		tab.push([ile, odstep]);
		now = 0;
		odstep -= mniej;
		if(odstep <= (height / 8.15))odstep = (height / 8.15);
	}
	ctx.fillStyle = "red";
	ctx.font = "20px sans-serif";
	if(grow<=0)ctx.fillText(0, 10,30); else ctx.fillText(grow, 10,30);
	ctx.fillStyle = "green";
	ctx.font = "10px sans-serif";
	ctx.fillText(Math.round(odstep), 10, 70);
	if((width-(odl*(tab.length-1))-now)<-70){
		tab.splice(0, 1);
		sprawdzanie++;
	}
	ctx.fillStyle = "blue";
	for(var i=0; i<tab.length;i++){
		var pos = width-(odl*(tab.length-1 - i))-now;
	ctx.fillRect(pos,0,blok,tab[i][0]);
	ctx.fillRect(pos,tab[i][0]+tab[i][1],blok,height-(tab[i][0]+tab[i][1]));
	if((pos >= 0) && (pos <= width/2))
		{
				for(var m=0;m<danger.length;m++){
				if(((birdx+danger[m][0]>=pos) && (birdx+danger[m][0]<=(pos+blok)) && (birdy+danger[m][1]<=tab[i][0])) || ((birdx+danger[m][0]>=pos) &&
				(birdx+danger[m][0]<=(pos+blok)) &&
				(birdy+danger[m][1]>=tab[i][0]+tab[i][1])))end = true;
			}
			if(birdx >= pos && birdx <= pos + blok){
					if(sprawdzanie == grow){
					grow++;
					stala = grow;
					}
				}
		}
	}
	if(grow != stala)grow = stala;
}
function showKey(e)
{
	if (e.keyCode) return e.keyCode;
}
document.addEventListener("DOMContentLoaded", function() {
	start();
	document.addEventListener("keydown", function(e) {
		if(String.fromCharCode(showKey(e))==" " || showKey(e) == 13){
			if(play == false){
				run();
				play = true;
				if(timer)clearTimeout(timer);
				}
			fast = skok;
			if(ponownie == true)newplease();
		}
	});
	document.addEventListener("touchstart", function(e){
	e.preventDefault();
		if(play == false){
				run();
				play = true;
				}
			fast = skok;
			if(ponownie == true)newplease();
	});
	if(window.navigator.platform.indexOf("Win") >= 0){
	canvas.addEventListener("click", function(e){
	e.preventDefault();
		if(play == false){
				run();
				play = true;
				}
			fast = skok;
			if(ponownie == true)newplease();
	});
}
});
