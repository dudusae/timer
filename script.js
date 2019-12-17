function degreesToRadians(degrees) {
    const pi = Math.PI;
    return degrees * (pi / 180);
}

function timeToDegrees(time) {
    var degrees = Math.abs(60 - time) * 6 - 90;
    return degrees
}

function timeToRotate(time) {
    var degrees = timeToDegrees(time);
    var d = ["rotate(", degrees, "500 500)"].join(" ");
    return d
}

function timeToRedpanel(time) {
    if (time == 60) {
        time = 59.999
    }

    const startX = 500,
        startY = 275,
        r = 225,
        sweep = 0;
    var large = 1,
        degrees = timeToDegrees(time),
        endX = Math.cos(degreesToRadians(degrees)) * r + startX,
        endY = Math.sin(degreesToRadians(degrees)) * r + startX;

    if (time < 30) {
        large = 0;
    }
    var d = ["M", startX, startY, "A", r, r, 0, large, sweep, endX, endY, "L", 500, 500, "Z"].join(" ");
    
    
    return d;
}

function disabled(id) {
    for (var i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).disabled = true;
    }
}

function enabled(id) {
    for (var i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).disabled = false;
    }
}

var resultToday = 0;

function startTimer() {
    var start = Date.now(),
        duration = document.getElementById("duration"),
        durationSec = duration.getAttribute("value") * 60;

    disabled("start", "duration");
    enabled("stop");

    function timeGoing() {
        var remain = durationSec - Math.round((Date.now() - start) / 1000),
            remainMin = remain / 60,
            remainMinInt = parseInt(remainMin),
            remainSecInt = Math.round(remain % 60);

        resultToday = resultToday + 1;
        var resultTodayHour = parseInt(resultToday / 3600),
            resultTodayMin = parseInt(resultToday / 60) - resultTodayHour * 60;
        // duration.setAttribute("value", remainMin);
        duration.value = remainMin;
        moveHands(remainMin);
        document.getElementById("result").innerHTML = remainMinInt + ":" + remainSecInt;
        document.getElementById("result_today").innerHTML = "오늘누적 : " + resultTodayHour + "시간" + resultTodayMin + "분";
        
        if (remain == 0) {
            stopTimer();
        }
        // if (remain <=1) {
        //     openFullscreen();
        // }
    }

    timerId = setInterval(timeGoing, 1000);

}

var vid = document.getElementById("myVideo"); 

function playVid() { 
  vid.play(); 
} 

function pauseVid() { 
  vid.pause(); 
} 

console.log('하잉4');



function stopTimer() {
    clearInterval(timerId);
    disabled("stop");
    enabled("duration", "start");
    console.log('하잉4');
    playVid();
}

function moveHands(time) {
    document.getElementById("duration").setAttribute("value", time);
    document.getElementById("red_panel").setAttribute("d", timeToRedpanel(time));
    document.getElementById("long_hand").setAttribute("transform", timeToRotate(time));
    document.getElementById("short_hand").setAttribute("transform", timeToRotate(time));
    document.getElementById("result").innerHTML = time + ":00";
}

// function openFullscreen() {
//     var container = document.getElementById("container"); 
//   if (container.requestFullscreen) {
//     container.requestFullscreen();
//   } else if (container.mozRequestFullScreen) { 
//     container.mozRequestFullScreen();
//   } else if (container.webkitRequestFullscreen) {
//     container.webkitRequestFullscreen();
//   } else if (container.msRequestFullscreen) { 
//     container.msRequestFullscreen();
//   }
// }

window.onload = function () {
    moveHands(document.getElementById("duration").value);
}