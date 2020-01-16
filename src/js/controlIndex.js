(function($,root){
    function Index(len){
        this.curIndex = 0;
        this.len = len;
    }
    Index.prototype.getNewIndex= function(str){
        if(str==='prev'){
            this.curIndex--;
        }else if(str==='next'){
            this.curIndex++;
        }
        return (this.curIndex+this.len)%this.len;
    }
    root.index=Index;
})(window.Zepto,window.player||(window.player={}))