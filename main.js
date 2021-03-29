var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var LinkedList = function(){
    var ll = [];
    var tail = ll;
    this.push = function(weight,a){
        tail[0] = [weight,a];
        tail[1] = [];
        tail = tail[1];
    };
    this.insert = function(weight,a){
        var llpc = ll;
        if(!llpc[0]){
            llpc[0] = [weight,a];
            llpc[1] = [];
            tail = llpc[1];
            return false;
        }else if(llpc[0][0] > weight){
            ll = [[weight,a],llpc];
            return false;
        }
        while(llpc[1][0]){
            var next = llpc[1];
            var thisone = llpc[0];
            var nextone = next[0];
            if(thisone[0] <= weight && weight <= nextone[0]){
                llpc[1] = [[weight,a],next];
                return false;
            }
            llpc = llpc[1];
        }
        llpc[1] = [[weight,a],[]];
        tail = llpc[1][1];
        return false;
    };
    this.list = function(){
        var llpc = ll;
        var arr = [];
        var a2 = [];
        while(llpc[0]){
            arr.push(llpc[0][1]);
            a2.push(llpc[0][0]);
            llpc = llpc[1];
        }
        //console.log(a2);
        return arr;
    };
};

var lines = [];
var points = new LinkedList();

var cx = 250;
var cy = 250;

var improvisedAtan2 = function(x,y){//its gonna make some order in my code
    //return Math.atan2(y,x);
    if(x > 0){
        return y;
    }else{
        return 10-y;
    }
};

var dist = function(a,b){
    return Math.sqrt(a*a+b*b)
};

canvas.addEventListener("click",function(e){
    var x = e.clientX-window.scrollX+this.offsetLeft;
    var y = e.clientY-window.scrollY+this.offsetTop;
    var dx = x-cx;
    var dy = y-cy;
    lines.push([cx,cy,x,y]);
    var r = Math.sqrt(dx*dx+dy*dy);
    var x1 = cx+dx*200/r;
    var y1 = cy+dy*200/r;
    var val = improvisedAtan2(dx/r,dy/r);//radius 1
    //console.log(val);
    points.insert(val,[x1,y1]);
    var arr = points.list();
    //console.log(arr);
    ctx.clearRect(0,0,500,500);
    ctx.beginPath();
    var len = 0;
    var prev = arr[arr.length-1];
    for(var i = 0; i < arr.length; i++){
        var xx = arr[i][0];
        var yy = arr[i][1];
        ctx.lineTo(xx,yy);
        var curr = arr[i];
        len += dist(curr[0]-prev[0],curr[1]-prev[1]);
        prev = arr[i];
    }
    var pi = len/400;
    console.log(pi);
    ctx.closePath();
    ctx.stroke();
    for(var i = 0; i < lines.length; i++){
        var xx0 = lines[i][0];
        var yy0 = lines[i][1];
        var xx1 = lines[i][2];
        var yy1 = lines[i][3];
        ctx.beginPath();
        ctx.moveTo(xx0,yy0);
        ctx.lineTo(xx1,yy1);
        ctx.stroke();
    }
    ctx.font = "30px Arial"
    ctx.strokeText("π = "+pi, 0,32);
});