const btnMenu = document.querySelector("#btnMenu");
const gnb = document.querySelector(".gnb");

btnMenu.addEventListener("click",()=>{
    btnMenu.classList.toggle("on");
    gnb.classList.toggle("on");
});