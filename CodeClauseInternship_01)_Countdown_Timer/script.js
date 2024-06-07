window.onload =()=>{
    document.querySelector('#start').onclick = start;
    document.querySelector('#reset').onclick = reset;
}

function start(){

    // fetch date & time which is selecting
    const date = document.querySelector("#date").value
    const time = document.querySelector("#time").value

    // stop id
    const stop = document.querySelector("#stop")

    // Time left
    const endTime = new Date(date + " " + time)

    const interval = setInterval(() => Time(endTime),1000)

    // stop button
    stop.addEventListener("click",()=>{
        clearInterval(interval)
    })

}

function Time(endTime){

    const currentTime = new Date();

    // select the ids
    const days = document.querySelector("#countdown-days")
    const hours = document.querySelector("#countdown-hours")
    const minutes = document.querySelector("#countdown-minutes")
    const seconds = document.querySelector("#countdown-seconds")

    if(endTime>currentTime){
        const timeLeft = (endTime - currentTime)/1000;
        // console.log(timeLeft);

        days.innerText = Math.floor(timeLeft/ (24*60*60))
        hours.innerText = Math.floor((timeLeft/ (60*60) )% 24)
        minutes.innerText = Math.floor((timeLeft/ 60)%60)
        seconds.innerText = Math.floor((timeLeft%60))

    }else{
        days.innerText = 0
        hours.innerText = 0
        minutes.innerText = 0
        seconds.innerText = 0
    }


}

// reset button
function reset(){
    document.querySelector("#countdown-days").innerText= 0
    document.querySelector("#countdown-hours").innerText= 0
    document.querySelector("#countdown-minutes").innerText= 0
    document.querySelector("#countdown-seconds").innerText= 0

}












