const $vidBox = $("#visual .rightVid");
const $bgImgs = $("#visual .bg");
const $btnNext = $("#visual .btn .btnNext");
const $btnPrev = $("#visual .btn .btnPrev");
const $inner = $("#visual .inner");
const $txtBoxs = $inner.children(".txt");
let visualIsDone = true;
let visualNum = 1;

$btnNext.on("click",function(){
    if(visualIsDone){
        visualIsDone = false;

        bgNext();
        vidNext();

        $inner.children(".on").addClass("upper");

        setTimeout(function(){
            $inner.children(".txt").removeClass("on");
            $inner.children(".txt").removeClass("upper");
            if(visualNum<2){
                $inner.children(".txt").eq(visualNum+1).addClass("on");
                visualNum++;
            } else {
                visualNum=0;
                $inner.children(".txt").eq(visualNum).addClass("on");
            }
        },1000);
    }
});

$btnPrev.on("click",function(){
    if(visualIsDone){
        visualIsDone = false;

        bgPrev();
        vidPrev();

        $inner.children(".on").addClass("upper");

        setTimeout(function(){
            $inner.children(".txt").removeClass("on");
            $inner.children(".txt").removeClass("upper");
            if(visualNum>0){
                $inner.children(".txt").eq(visualNum-1).addClass("on");
                visualNum--;
            } else {
                visualNum=2;
                $inner.children(".txt").eq(visualNum).addClass("on");
            }
        },1000);
    }
});


function bgNext(){
    $bgImgs.children("li").fadeOut(750);
    $bgImgs.children("li").first().delay(750).appendTo($bgImgs);
    $bgImgs.children("li").eq(1).delay(750).fadeIn(750);
}
function bgPrev(){
    $bgImgs.children("li").fadeOut(750);
    $bgImgs.children("li").last().delay(750).prependTo($bgImgs);
    $bgImgs.children("li").eq(1).delay(750).fadeIn(750);
}

function vidNext(){
    $vidBox.children("li").eq(1).animate({top:"-20%"},1500,"easeOutExpo");
    $vidBox.children("li").eq(2).animate({
        top:0
    },1500,"easeOutExpo",function(){
        $vidBox.children("li").first().appendTo($vidBox);
        vidTopInit();
    });
}

function vidPrev(){
    $vidBox.children("li").eq(1).animate({top:"20%"},1500,"easeOutExpo");
    $vidBox.children("li").eq(0).animate({
        top:0
    },1500,"easeOutExpo",function(){
        $vidBox.children("li").last().prependTo($vidBox);
        vidTopInit();
    });
}

function vidTopInit(){
    $vidBox.children("li").eq(0).css({top:"-100%"});
    $vidBox.children("li").eq(2).css({top:"100%"});
    $vidBox.children("li").css({transform: "scale(1)"});
    visualIsDone = true;
}