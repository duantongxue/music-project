(function($,root){
    function MyAudio(){
        this.audio = new Audio();
        this.status = 'noPlay';
    }
    MyAudio.prototype.play=function(){
        this.audio.play();
        this.status='play';
    }
    MyAudio.prototype.pause=function(){
        this.audio.pause();
        this.status='noPlay';
    }
    MyAudio.prototype.load=function(src){
        this.audio.src=src;
    }
    MyAudio.prototype.playTo=function(time){
        console.log(time)
        this.audio.currentTime=time;
        this.audio.play();
    }
    root.audio = new MyAudio();
})(window.Zepto,window.player||(window.player={}))