
let curIndex;
let len = 0;
let indexObj;
let dataAll;
let player = window.player;
function init(){
    bindEvent();
    getData();
}
init();
function getData(){
    $.ajax({
        type:'GET',
        url:'./mock/data.json',
        success:function(data){
            console.log(data)
            dataAll = data;
            curIndex = 0;
            len = data.length;
            $('body').trigger('data:click');
            //根据len初始化一个控制index轮询的对象
            indexObj = new player.index(len);
            renderPlayList();
        }
    })
}
//加载并判断是否播放歌曲
function prevLoad(){
    player.audio.load(dataAll[curIndex].audio)
    if(player.audio.status ==='play'){
        player.audio.play();
        player.pro.start();
    }else{
        player.pro.update(0);
    }
}
function bindEvent(){
    //绑定一个自定义事件，处理函数作用为渲染界面，加载并判断是否播放歌曲
    $('body').on('data:click',function(e,str){
        if(str){
            curIndex = indexObj.getNewIndex(str);
            renderPlayList();
        }
        player.render(dataAll[curIndex]);
        player.pro.renderAlltime(dataAll[curIndex].duration)
        prevLoad();
    })
    //绑定播放暂停的事件
    $('.btn.isPlay').on('click',function(){
        if(player.audio.status==='noPlay'){
            player.audio.play();
            player.pro.start();
            $(this).removeClass('noPlay').addClass('play');
        }else{
            player.audio.pause();
            player.pro.stop();
            $(this).removeClass('play').addClass('noPlay');
        }
    })
    //绑定切换歌曲的事件
    $('.btn.prev').on('click',function(){
        $('body').trigger('data:click','prev');
    })
    $('.btn.next').on('click',function(){
        $('body').trigger('data:click','next');
    })
    //绑定进度条拖放的事件
    let left = $('.process-wrapper').offset().left;   
    let width = $('.process-wrapper').offset().width;
    let dis,newPer,curDuration;
   $('.slot').on('touchstart',function(){
       player.pro.stop();
       $(this).on('touchmove',function(e){
         dis = e.changedTouches[0].clientX - left;
         newPer = dis/width;
         if(newPer<0||newPer>1){
             newPer = 0;
         }
         player.pro.update(newPer);
       })
       $(this).on('touchend',function(e){
        dis = e.changedTouches[0].clientX - left;
        newPer = dis/width;
        if(newPer<0||newPer>1){
            newPer = 0;
        }
        curDuration = Math.round(newPer*dataAll[curIndex].duration);
        player.audio.playTo(curDuration);
        if(player.audio.status==='noPlay'){
            $('.btn.isPlay').removeClass('noPlay').addClass('play');
        };
        player.audio.status="play";
        player.pro.start(newPer);
       })
   })
   //绑定播放列表的事件
   $('.btn.list').on('click',function(){
        $('.playList').css('display','block');
   })
   $('.playList button').on('click',function(){
       $('.playList').css('display','none');
   })
   $('.playList ul').on('click',function(e){
        $('.playList button').click();
        curIndex = $(e.target).index();
        renderPlayList();
        if(player.audio.status==='noPlay'){
            $('.btn.isPlay').removeClass('noPlay').addClass('play');
        };
        player.audio.status='play';
        $('body').trigger('data:click');

   })
}
function renderPlayList(){
        let str='';
        for(let i = 0 ; i<dataAll.length;i++){
            if(i==curIndex){
                str+='<li class="active">'+dataAll[i].song+'-'+dataAll[i].singer+'</li>'
            }else{
                str+='<li>'+dataAll[i].song+'-'+dataAll[i].singer+'</li>'
            }
        };
        $('.playList ul').html(str);
}