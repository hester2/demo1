/**
 * Created by Administrator on 2018/10/9/009.
 */
window.onload=function(){
    searchEffect();
    timeBack();
    bannerEffect();
}
//头部js效果
function searchEffect(){
    //获取当前banner轮播图的高度
    var banner=document.querySelector(".j_banner");
    var bannerHeight=banner.offsetHeight;
     //获取搜索块
    var search=document.querySelector(".j_search");
//获取当期屏幕滚动时， banner滚动出去的距离
    window.onscroll=function(){
        var offsetTop=document.documentElement.scrollTop;

        if(offsetTop<bannerHeight){
            var opacity=offsetTop/bannerHeight;

            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}
//时间
 function timeBack(){
     var spans=document.querySelector(".j_shijian").querySelectorAll("span");
     var totalTime=3700;

     var timerId=setInterval(function(){
         totalTime--;

         if(totalTime<0){
             clearInterval(timerId);
             return;
         }
         var hour=Math.floor(totalTime/3600);
         var minute=Math.floor(totalTime%3600/60);
         var second=Math.floor(totalTime%60);
         //赋值 将时间填充span中
         spans[0].innerHTML=Math.floor(hour/10);
         spans[1].innerHTML=Math.floor(hour%10);

         spans[3].innerHTML=Math.floor(minute/10);
         spans[4].innerHTML=Math.floor(minute%10);

         spans[6].innerHTML=Math.floor(second/10);
         spans[7].innerHTML=Math.floor(second%10);
     },1000);
 }
//轮播图
function bannerEffect(){
    var banner =document.querySelector(".j_banner");
    var imgBox=banner.querySelector("ul:first-of-type");
    console.log(imgBox);
    var first=imgBox.querySelector("li:first-of-type");
    var last=imgBox.querySelector("li:last-of-type");

    imgBox.appendChild(first.cloneNode(true));

    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    //获取所有li
    var lis=imgBox.querySelectorAll("li");
    //li的数量
    var count=lis.length;

    //获取banner的宽度
    var bannerWidth=banner.offsetWidth;
    console.log(bannerWidth);

    imgBox.style.width=count*bannerWidth+"px";

    for(var i=0; i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    //定义图片索引
    var index=1;
    //设置默认的偏移
    imgBox.style.left=-bannerWidth+"px";

    //实现点标记
    var setIndicator=function(index){
        var indicators=banner.querySelector("ol:last-of-type").querySelectorAll("li");
        /*先清除其它li元素的active样式*/
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove("wihte");
        }
        /*为当前li元素添加active样式*/
        indicators[index-1].classList.add("wihte");

    };
    var timerId;
    //实现自动轮播
    var startTime=function(){
        timerId=setInterval(function(){
            index++;

            imgBox.style.transition="left 0.5s ease-in-out";

            imgBox.style.left=(-index*bannerWidth)+"px";

            setTimeout(function(){
                if(index==count-1){
                    console.log(index);
                    index=1;

                    imgBox.style.transition="none";

                    imgBox.style.left=(-index*bannerWidth)+"px";
                }
            },500)
        },2000)
    };
    startTime();

    //实现手动轮播
    var startX,moveX,distanceX;
    /*标记当前过渡效果是否已经执行完毕*/
    var isEnd=true;
    /*为图片添加触摸事件--触摸开始*/
    imgBox.addEventListener("touchstart",function(e){
        /*清除定时器*/
        console.log(e);
        clearInterval(timerId);
        /*获取当前手指的起始位置*/
        startX= e.targetTouches[0].clientX;
    });
    /*为图片添加触摸事件--滑动过程*/
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            console.log("touchmove");
            /*记录手指在滑动过程中的位置*/
            moveX= e.targetTouches[0].clientX;
            /*计算坐标的差异*/
            distanceX=moveX-startX;
            /*为了保证效果正常，将之前可能添加的过渡样式清除*/
            imgBox.style.transition="none";
            /*实现元素的偏移  left参照最原始的坐标
             * 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    /*添加触摸结束事件*/
    /*touchend:松开手指触发*/
    imgBox.addEventListener("touchend",function(e){
        /*松开手指，标记当前过渡效果正在执行*/
        isEnd=false;
        /*获取当前滑动的距离，判断距离是否超出指定的范围 100px*/
        if(Math.abs(distanceX) > 100){
            /*判断滑动的方向*/
            if(distanceX > 0){//上一张
                index--;
            }
            else{ //下一张
                index++;
            }
            /*翻页*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){ //得保证用户确实进行过滑动操作
            /*回弹*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*将上一次move所产生的数据重置为0*/
        startX=0;
        moveX=0;
        distanceX=0;
    });

    /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
        /* console.log("webkitTransitionEnd");*/
        /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
        console.log(index);
        if(index==count-1){
            index=1;
            /*清除过渡*/
            imgBox.style.transition="none";
            /*设置偏移*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            /*清除过渡*/
            imgBox.style.transition="none";
            /*设置偏移*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*设置标记*/
        setIndicator(index);
        setTimeout(function(){
            isEnd=true;
            /*清除之前添加的定时器*/
            clearInterval(timerId);
            //重新开启定时器
            startTime();
        },100);
    });
}