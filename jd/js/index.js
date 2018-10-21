/**
 * Created by Administrator on 2018/10/9/009.
 */
window.onload=function(){
    searchEffect();
    timeBack();
    bannerEffect();
}
//ͷ��jsЧ��
function searchEffect(){
    //��ȡ��ǰbanner�ֲ�ͼ�ĸ߶�
    var banner=document.querySelector(".j_banner");
    var bannerHeight=banner.offsetHeight;
     //��ȡ������
    var search=document.querySelector(".j_search");
//��ȡ������Ļ����ʱ�� banner������ȥ�ľ���
    window.onscroll=function(){
        var offsetTop=document.documentElement.scrollTop;

        if(offsetTop<bannerHeight){
            var opacity=offsetTop/bannerHeight;

            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}
//ʱ��
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
         //��ֵ ��ʱ�����span��
         spans[0].innerHTML=Math.floor(hour/10);
         spans[1].innerHTML=Math.floor(hour%10);

         spans[3].innerHTML=Math.floor(minute/10);
         spans[4].innerHTML=Math.floor(minute%10);

         spans[6].innerHTML=Math.floor(second/10);
         spans[7].innerHTML=Math.floor(second%10);
     },1000);
 }
//�ֲ�ͼ
function bannerEffect(){
    var banner =document.querySelector(".j_banner");
    var imgBox=banner.querySelector("ul:first-of-type");
    console.log(imgBox);
    var first=imgBox.querySelector("li:first-of-type");
    var last=imgBox.querySelector("li:last-of-type");

    imgBox.appendChild(first.cloneNode(true));

    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    //��ȡ����li
    var lis=imgBox.querySelectorAll("li");
    //li������
    var count=lis.length;

    //��ȡbanner�Ŀ��
    var bannerWidth=banner.offsetWidth;
    console.log(bannerWidth);

    imgBox.style.width=count*bannerWidth+"px";

    for(var i=0; i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    //����ͼƬ����
    var index=1;
    //����Ĭ�ϵ�ƫ��
    imgBox.style.left=-bannerWidth+"px";

    //ʵ�ֵ���
    var setIndicator=function(index){
        var indicators=banner.querySelector("ol:last-of-type").querySelectorAll("li");
        /*���������liԪ�ص�active��ʽ*/
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove("wihte");
        }
        /*Ϊ��ǰliԪ�����active��ʽ*/
        indicators[index-1].classList.add("wihte");

    };
    var timerId;
    //ʵ���Զ��ֲ�
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

    //ʵ���ֶ��ֲ�
    var startX,moveX,distanceX;
    /*��ǵ�ǰ����Ч���Ƿ��Ѿ�ִ�����*/
    var isEnd=true;
    /*ΪͼƬ��Ӵ����¼�--������ʼ*/
    imgBox.addEventListener("touchstart",function(e){
        /*�����ʱ��*/
        console.log(e);
        clearInterval(timerId);
        /*��ȡ��ǰ��ָ����ʼλ��*/
        startX= e.targetTouches[0].clientX;
    });
    /*ΪͼƬ��Ӵ����¼�--��������*/
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            console.log("touchmove");
            /*��¼��ָ�ڻ��������е�λ��*/
            moveX= e.targetTouches[0].clientX;
            /*��������Ĳ���*/
            distanceX=moveX-startX;
            /*Ϊ�˱�֤Ч����������֮ǰ������ӵĹ�����ʽ���*/
            imgBox.style.transition="none";
            /*ʵ��Ԫ�ص�ƫ��  left������ԭʼ������
             * �ش�ϸ�ڣ����εĻ�������Ӧ�û���֮ǰ�ֲ�ͼ�Ѿ�ƫ�Ƶľ���*/
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    /*��Ӵ��������¼�*/
    /*touchend:�ɿ���ָ����*/
    imgBox.addEventListener("touchend",function(e){
        /*�ɿ���ָ����ǵ�ǰ����Ч������ִ��*/
        isEnd=false;
        /*��ȡ��ǰ�����ľ��룬�жϾ����Ƿ񳬳�ָ���ķ�Χ 100px*/
        if(Math.abs(distanceX) > 100){
            /*�жϻ����ķ���*/
            if(distanceX > 0){//��һ��
                index--;
            }
            else{ //��һ��
                index++;
            }
            /*��ҳ*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){ //�ñ�֤�û�ȷʵ���й���������
            /*�ص�*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*����һ��move����������������Ϊ0*/
        startX=0;
        moveX=0;
        distanceX=0;
    });

    /*webkitTransitionEnd:���Լ�����ǰԪ�صĹ���Ч��ִ����ϣ���һ��Ԫ�صĹ���Ч��ִ����ϵ�ʱ�򣬻ᴥ������¼�*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
        /* console.log("webkitTransitionEnd");*/
        /*����������һ��(count-1)���ص�����1*/
        /*������˵�һ��(0)���ص�����count-2*/
        console.log(index);
        if(index==count-1){
            index=1;
            /*�������*/
            imgBox.style.transition="none";
            /*����ƫ��*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            /*�������*/
            imgBox.style.transition="none";
            /*����ƫ��*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*���ñ��*/
        setIndicator(index);
        setTimeout(function(){
            isEnd=true;
            /*���֮ǰ��ӵĶ�ʱ��*/
            clearInterval(timerId);
            //���¿�����ʱ��
            startTime();
        },100);
    });
}