// https://www.googleapis.com/youtube/v3/playlistItems
// PL-4RqvSks9qU6ZgUR9NmKCqXWeUJ97FLH
class myYoutube{
    constructor(selector,opt){
        const main = document.querySelector("main");
        const frame = document.querySelector(selector);
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${opt.key}&part=snippet&playlistId=${opt.playlist}&maxResults=${opt.count}`;

        fetch(url)
        .then(data=>{
            return data.json();
        })
        .then(json=>{
            const items = json.items;
            let resultHtml = "";

            items.forEach(item => {
                console.log(item);
                let vidTit = item.snippet.title;
                let vidDesc = item.snippet.description;
                let vidDate = item.snippet.publishedAt;

                if(vidTit.length > 50) vidTit = vidTit.substr(0,50)+"...";
                if(vidDesc.length > 120) vidDesc = vidDesc.substr(0,120)+"...";
                vidDate = vidDate.split("T")[0];

                resultHtml += `
                    <article>
                        <a href="${item.snippet.resourceId.videoId}" class="vidLink">
                            <img src="${item.snippet.thumbnails.standard.url}">
                        </a>
                        <div class="con">
                            <div class="title">${vidTit}</div>
                            <p>${vidDesc}</p>
                            <span>${vidDate}</span>
                        </div>
                    </article>
                `;
            });
            frame.innerHTML = resultHtml;
        })

        frame.addEventListener("click",(e)=>{
            e.preventDefault();
            let target = e.target.closest("a");
            if(target == null) return;
            const vidId = target.getAttribute("href");
            
            let pop = document.createElement("aside");
            pop.innerHTML=`
                <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
                <span class="btnClose">close</span>
            `;
            main.append(pop);
        });

        main.addEventListener("click",(e)=>{
            const pop = main.querySelector("aside");
            if(pop == null) return;

            const close = pop.querySelector(".btnClose");
            if(e.target == close) e.target.closest("aside").remove();
        });
    }
}

