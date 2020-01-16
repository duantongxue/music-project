
(function($,root){
    function renderImage(url){
        const img = new Image();
        img.onload = function(){
            root.blurImg(img, $('body'))
        }
        img.src = url;
        $('.song-img .img').css('background-image','url('+url+')');
    }
    function renderInfo(info){
        let str = '<p class="song-name">'+info.song+'</p>\
        <p class="song-singer">'+info.singer+'</p>\
        <p class="song-album">'+info.album+'</p>';
        $('.song-info').html(str);
    }
    function renderLike(isLike){
       $('.btn.isLike').removeClass('noLike').removeClass('like');
        if(isLike){
            $('.btn.isLike')
            .addClass('like');
        }else{
            $('.btn.isLike').addClass('noLike');
        }
    }
    function render(dataObj){
        renderImage(dataObj.image);
        renderInfo(dataObj);
        renderLike(dataObj.isLike);
    }
    root.render = render;
})(window.Zepto,window.player||(window.player={}))
