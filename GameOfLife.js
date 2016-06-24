
var worldSize=60;
var worldLength=600;
var mainColorObj={
  "r":1,
  "g":85,
  "b":122,
}
var mainColor=rgbToHex(mainColorObj.r,mainColorObj.g,mainColorObj.b);

var life;
var flag=false;
var pool= new Array(worldSize);
var poolNext= new Array(worldSize);
var background=new Array(worldSize);
var blockSize=worldLength/worldSize;
var canvas = document.getElementById("GML");
var ctx = canvas.getContext("2d");

worldSize=worldSize-1;
canvas.height=worldLength;
canvas.width=worldLength;
//ctx.fillStyle="#5b557a";
ctx.fillStyle=mainColor;
window.onload=init();

//change rgb color to #xxxxxx
function rgbToHex(r,g,b){
   var R=parseInt(r).toString(16);
   if(R.length<2){
    R="0"+R;
   }
   var G=parseInt(g).toString(16);
   if(G.length<2){
    G="0"+G;
   }
   var B=parseInt(b).toString(16);
   if(B.length<2){
    B="0"+B;
   }
   return "#"+R+G+B;
}
//change #xxxxxx to rbg color
function HexToColor(color){

}

function lighter(a,color){

}


function init(){
    for(var i=0;i<=worldSize;i++){
        pool[i]=new Array(worldSize);
        poolNext[i]=new Array(worldSize);
        background[i]=new Array(worldSize);
    }

    for(var i=0;i<=worldSize;i++){
	    for(var j=0;j<=worldSize;j++){
		    pool[i][j]=0;
		    poolNext[i][j]=0;
        background[i][j]=.0;
	    }
    }
    

    canvas.addEventListener("mousemove", function (e) { 
    	if(flag==true){
        var mousePos = getMousePos(canvas, e); 
        var i=parseInt(mousePos.x/blockSize);
        var j=parseInt(mousePos.y/blockSize);
        ctx.fillRect(i*blockSize,j*blockSize,blockSize,blockSize);
        pool[i][j]=1;
    }
    }, false); 
    canvas.addEventListener("mousedown", function (e) { 
    	flag=true;
    }, false); 
    canvas.addEventListener("mouseup", function (e) { 
    	flag=false;
    }, false); 

}

/*
var RAF = (function () {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();
*/
 function getMousePos(canvas, e) { 
   var rect = canvas.getBoundingClientRect(); 
   return { 
     x: e.clientX - rect.left * (canvas.width / rect.width),
     y: e.clientY - rect.top * (canvas.height / rect.height)
   }
 }

function next(){


	ctx.fillStyle="#fff";
	ctx.fillRect(0,0,worldLength,worldLength);

      for(var i=0;i<=worldSize;i++){
      for(var j=0;j<=worldSize;j++){
        var va=background[i][j];
        var br=255-mainColorObj.r;
        var bb=255-mainColorObj.b;
        var bg=255-mainColorObj.g;
        ctx.fillStyle=rgbToHex(255-va*br,255-va*bb,255-va*bg);
        ctx.fillRect(i*blockSize,j*blockSize,blockSize,blockSize);
      }
    }

   for(var i=1;i<=worldSize-1;i++){
   	for(var j=1;j<=worldSize-1;j++){
   		var count=0;
   		for(var k=-1;k<=1;k++){
   			for(var m=-1;m<=1;m++){
   				if(k!=0||m!=0){
   					if(pool[i+k][j+m]==1){
   						count++;
   				    }
   				}
   				
   			}
   		}
   		poolNext[i][j]=0;
   		if(count==3){
   		  poolNext[i][j]=1;
        background[i][j]=1.0;
        ctx.fillStyle=mainColor;
        ctx.fillRect(i*blockSize,j*blockSize,blockSize,blockSize);
   		}
   		if(count==2){
   			if(pool[i][j]==1){
   				poolNext[i][j]=1;
        background[i][j]=1.0;

        ctx.fillRect(i*blockSize,j*blockSize,blockSize,blockSize);
   			}
   		}


   	}
   }

    for(var i=0;i<=worldSize;i++){
	    for(var j=0;j<=worldSize;j++){
		    pool[i][j]=poolNext[i][j];
        background[i][j]=3*background[i][j]/4;
	    }
    }

}

function go(){
	life=self.setInterval("next()",50);
  document.getElementById("stopBtn").disabled=false;
  document.getElementById("goBtn").disabled=true;
}

function stop(){
	life=window.clearInterval(life);
  document.getElementById("stopBtn").disabled=true;
  document.getElementById("goBtn").disabled=false;
}


