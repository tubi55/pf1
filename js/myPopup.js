class CookiePopup{
    constructor(frame,opt){
        this.cookieName = opt.name;
        this.popup = document.querySelector(frame);
        this.popCheck = this.popup.querySelector("input[type=checkbox]");
        this.close = this.popup.querySelector(opt.btnClose);
        this.isCookie = document.cookie.indexOf(this.cookieName);
        console.log(document.cookie);

        this.isOn;
        if(this.isCookie == -1){ this.isOn = "display";} else {this.isOn = "none";}
        this.popup.style.display = this.isOn;

        this.close.addEventListener("click",(e)=>{
            this.popup.style.display = "none";

            let isChecked = this.popCheck.checked;
            if(isChecked) { this.setCookie(this.cookieName,1);}
        });
    }

    setCookie(name,due){
        const today = new Date();
        const date = today.getDate();
        today.setDate(date+due);
        const dueDate = today.toGMTString();

        document.cookie = `${name}; path=/; expires=${dueDate}`;
    }
}