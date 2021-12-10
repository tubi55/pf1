const bgs = document.querySelectorAll(".bg li");
const inner = document.querySelector("#visual .inner");
const txts = inner.querySelectorAll(".txt");
const vids_ul = document.querySelector(".vidFrame");
const vids = vids_ul.querySelectorAll("li");
const btnPrev = document.querySelector(".btn .btnPrev");
const btnNext = document.querySelector(".btn .btnNext");

let i = 1;

btnNext.addEventListener("click",(e)=>{
    if(i > 1) { i = 0;} else { i++;}
    
    //vid
    new Anim(vids_ul,{
        prop: "top",
        value: "-200%",
        duration: 1500,
        callback: ()=>{
            vids_ul.append(vids_ul.firstElementChild);
            vids_ul.style.top = "-100%";
        }
    });

    //bg
    let j = i - 1;
    if(j < 0) j = 2;
    new Anim(bgs[j],{
        prop: "opacity",
        value: 0,
        duration: 750,
    });
    setTimeout(()=>{
        new Anim(bgs[i],{
            prop: "opacity",
            value: 1,
            duration: 750,
        });
    }, 750);

    //txt
    inner.querySelector(".on").classList.add("upper");
    setTimeout(()=>{
        txts.forEach((txt)=>{
            txt.classList.remove("on");
            txt.classList.remove("upper");
        });
        txts[i].classList.add("on");
    }, 1000);
});
