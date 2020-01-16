
(function($,root){
    let timer,startTime,curDuration,lastPer=0,per;
    function start(newLastPer){
        cancelAnimationFrame(timer);
        lastPer= (newLastPer===undefined?lastPer:newLastPer);
        console.log(lastPer);
        startTime= new Date().getTime();
        function fram(){
            let newTime = new Date().getTime();
            let disTime = newTime - startTime;
            let per = lastPer + disTime/(curDuration*1000);
            if(per<1){
                update(per);
                timer=requestAnimationFrame(fram);
            }else{
                cancelAnimationFrame(timer);
                $('.btn.next').click();
            }
        }
        fram();
    }
    function stop(){
        cancelAnimationFrame(timer);
        let stopTime = new Date().getTime();
        let disTime = stopTime - startTime;
          lastPer = disTime/(curDuration*1000) + lastPer;
    }
    function update(per){
        let updatePer = (1-per)*100;
        $('.process-top').css({
            transform:'translateX(-'+updatePer+'%)'
        });
        let updateTime = format(curDuration*per);
        $('.curTime').text(updateTime);
    }
  
    function renderAlltime(duration){
        lastPer = 0;
        curDuration = duration;
        $('.totalTime').text(format(duration));
    }
    function format(time){
           time = Math.round(time);
        let min = Math.floor(time/60);
        let second = time - min*60;
        if(min<10){
            min= '0'+min;
        }
        if(second<10){
            second='0'+second;
        }
        return min+':'+second;
    }
    root.pro={
     start,
     stop,
     update,
     renderAlltime
    }
})(window.Zepto,window.player||(window.player={}))