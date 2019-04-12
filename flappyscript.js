var canvas, ctx;
var width = window.innerWidth;;
var height = window.innerHeight;
var birdx = 200;
var birdy = height/2;
var grawity = (height*0.00085);
var skok = -(height*0.015);
var fast = 0;
var odl = 400;
var now = 0;
var tab = [];
var grow = 0;
var stala = 0;
var druga = 0;
var end = false;
var ter = 0;
var odstep = 200;
var danger = [[21,11], [19, 14], [16,15], [11,16], [4,9], [10,4], [16, 4], [18,6]];
var img;
var imgptak;
var play = false;
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
	odstep = 200;
	play = false;
	ponownie = false;
	var ile = Math.random()*(height*0.45)+20;
		tab.push([ile, odstep]);
		ctx.fillStyle = "#222";
		ctx.fillRect(0,0, width, height);
		setTimeout("gamesub()", 20);
}
function start()
{
	for(var n=0;n<danger.length;n++)
	{
		danger[n][0] = danger[n][0]*3;
		danger[n][1] = danger[n][1]*3;
	}
	//652
	img = document.getElementById("img");
	imgptak = document.getElementById("img-ptak");
	canvas = document.getElementById("can");
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	var ile = Math.random()*(height*0.45)+20;
		tab.push([ile, odstep]);
		ctx.fillStyle = "#222";
		ctx.fillRect(0,0, width, height);
		setTimeout("gamesub()", 20);
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
	ctx.fillText("Rekord ziemi: "+baza+", zdobyty przez: "+imiona, width/2 - 250, height/2+80);
	ctx.fillText("Kliknij Spację lub myszkę aby zagrać", width/2 - 250, height/2 + 160);
	ctx.font = "200px Arial";
	ctx.fillStyle = "red";
	ctx.fillText(baza, 100, 300);
	
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
	timer = setTimeout("falsz()", 50);
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
	if(parseInt(localStorage.getItem("record")) >= 0){
		odczyt = parseInt(localStorage.getItem("record"));
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
	if(baza < grow){
		console.log("jeje");
		
		document.getElementById("center").style.display = "block";
		document.getElementById("getinto").innerHTML = "<input id=\"myText\" type=\"hidden\" name=\"rek\" value=\""+ grow+ "\" />";
		document.getElementById("myText").readOnly = true; 
	}
	ctx.fillText("Aby zagrać ponownie naciśnij spację albo ekran", width/2-300,height/4 + 230);
	setTimeout("jakos()", 300);
}
function jakos()
{
	ponownie = true;
}
function run()
{
	if(end==false){
	loop();
	setTimeout("run()", 20);
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
	if(birdy+30>=height)end=true;
	if(birdy + 30 <= 0)birdy = -30;
	ctx.drawImage(img, 260, 60, 25, 20, birdx, birdy, 75,60);
	now +=8;
	//mur
	if(now >= odl){
		var ile = Math.random()*(height*0.60)+(height/32.6);
		tab.push([ile, odstep]);
		now = 0;
		odstep -= 3;//3
		if(odstep <= (height / 8.15))odstep = (height / 8.15);
	}
	ctx.fillStyle = "green";
	ctx.font = "10px sans-serif";
	if(grow<=0)ctx.fillText(0, 10,30); else ctx.fillText(grow, 10,30);
	ctx.fillText(odstep, 10, 70);
	if((width-(odl*(tab.length-1))-now)<-70){
		tab.splice(0, 1);
		sprawdzanie++;
	}
	ctx.fillStyle = "blue";
	for(var i=0; i<tab.length;i++){
		var pos = width-(odl*(tab.length-1 - i))-now;
	ctx.fillRect(pos,0,50,tab[i][0]);
	ctx.fillRect(pos,tab[i][0]+tab[i][1],50,height-(tab[i][0]+tab[i][1]));
	if((pos >= 0) && (pos <= width/2))
		{
				for(var m=0;m<danger.length;m++){
				if(((birdx+danger[m][0]>=pos) && (birdx+danger[m][0]<=(pos+50)) && (birdy+danger[m][1]<=tab[i][0])) || ((birdx+danger[m][0]>=pos) &&
				(birdx+danger[m][0]<=(pos+50)) && 
				(birdy+danger[m][1]>=tab[i][0]+tab[i][1])))end = true;
			}
		if(birdx >= pos && birdx <= pos + 50){
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
		if(String.fromCharCode(showKey(e))==" "){
			if(play == false){
				run();
				play = true;
				if(timer)clearTimeout(timer);
				}
			fast = skok;
			if(ponownie == true){
				if(baza >= grow)newplease();
			}
		}
	});
	canvas.addEventListener("touchstart", function(e){
	e.preventDefault();
		if(play == false){
				run();
				play = true;
				}
			fast = skok;
			if(ponownie == true){
				if(baza >= grow)newplease();
			}
	});
});