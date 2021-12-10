/*
48fa09238ff7a579f7c89acef3c946b7
194176696@N08
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value
https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

flickr.people.getPhotos
flickr.photos.search
*/
const main = document.querySelector("main");
const searchBar = document.querySelector(".searchBar");
const btnSearch = document.querySelector(".btnSearch");
const loading = document.querySelector(".loading");
const frame = document.querySelector(".list");
const urlBase = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.people.getPhotos";
const method2 = "flickr.photos.search";
const key = "48fa09238ff7a579f7c89acef3c946b7";
const user_id = "194176696@N08";
const per_page = 15;
const format = "json";

//계정 업로드 이미지 검색
const url1 = `${urlBase}method=${method1}&api_key=${key}&user_id=${user_id}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

//처음 로딩
callData(url1);

//주제 검색
//버튼
btnSearch.addEventListener("click",(e)=>{
    e.preventDefault();
    let search = searchBar.value;
    if(search == "") return;

    const url2 = `${urlBase}method=${method2}&api_key=${key}&tags=${search}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1`;

    callData(url2);
});
//엔터
searchBar.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        let search = searchBar.value;
        if(search == "") return;

        const url2 = `${urlBase}method=${method2}&api_key=${key}&tags=${search}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1`;

        callData(url2);
    }
});

//동적 팝업
frame.addEventListener("click",(e)=>{
    e.preventDefault();

    let target = e.target.closest(".item");
    let imgSrc = target.querySelector("a").getAttribute("href");

    let pop = document.createElement("aside");
    let popHtmls = `
        <img src="${imgSrc}">
        <span class="btnClose">close</span>
    `;
    pop.innerHTML = popHtmls;
    main.append(pop);
});

main.addEventListener("click",(e)=>{
    e.preventDefault();

    let target = e.target.closest("aside");
    if(target != null) {
        let imgFrame = target.querySelector("img");
        if(e.target != imgFrame) target.remove();
    }
});


function callData(url){
    initData();

    fetch(url)
    .then(data=>{
        let result = data.json();
        return result;
    })
    .then(json=>{
        let items = json.photos.photo;
    
        createList(items);
        delayLoading();
    })
}

function initData(){
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");
}

function createList(items){
    let htmls = "";

    items.forEach(data => {
        console.log(data);

        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
        let thumbSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        htmls += `
            <li class="item">
                <div class="panel">
                    <div class="txt">
                        <p>${data.title}</p>
                        <span>${data.owner}</span>
                    </div>
                    <a href="${imgSrc}"><img src="${thumbSrc}" class="thumb"></a>
                </div>
            </li>
        `;
    });
    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const lenImg = imgs.length;
    let countImg = 0;
    for(let el of imgs){
        el.addEventListener("load",()=>{
            countImg++;

            if(countImg == lenImg) isotopeLayout();
        });

        let thumbImg = el.closest(".item").querySelector(".thumb");
        thumbImg.addEventListener("error",(e)=>{
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src","img/default.jpg");
        });
    }
}

function isotopeLayout(){
    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope(".list",{
        itemSelector: ".item",
        columnWidth: ".item",
        transitionDuration: "0.5s"
    });
}

