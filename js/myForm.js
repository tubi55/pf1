class FormCheck{
    constructor(selector,arr){
        this.form = document.querySelector(selector);
        this.btnSubmit = this.form.querySelector("input[type=submit]");

        arr.forEach(option => {
            this.btnSubmit.addEventListener("click",(e)=>{
                if(option.type === "text"){
                    if(!this.isTxt(option.name, option.len)) e.preventDefault();
                }
                if(option.type === "check"){
                    if(!this.isCheck(option.name)) e.preventDefault();
                }
                if(option.type === "select"){
                    if(!this.isSelect(option.name)) e.preventDefault();
                }
                if(option.type === "pwd"){
                    if(!this.isPwd(option.name[0], option.name[1], option.len)) e.preventDefault();
                }
            });
        });
    }
    isTxt(name, len){
        const input = this.form.querySelector(`[name=${name}]`);
        const txt = input.value;

        if(txt.length >= 2){
            const errMsgs = input.closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();
            return true;
        } else {
            const errMsgs = input.closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

            const alert = document.createElement("p");
            alert.append(`해당 필수 텍스트를 ${len}글자 이상 입력하세요.`);
            input.closest("td").append(alert);
            return false;
        }
    }
    isCheck(name){
        const checkings = this.form.querySelectorAll(`[name=${name}]`);
        let isChecked = false;
        for(let checking of checkings){
            if(checking.checked) isChecked = true;
        }

        if(isChecked){
            const errMsgs = checkings[0].closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) checkings[0].closest("td").querySelector("p").remove();
            return true;
        } else {
            const errMsgs = checkings[0].closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) checkings[0].closest("td").querySelector("p").remove();

            const alert = document.createElement("p");
            alert.append(`필수 항목을 하나 이상 선택하세요.`);
            checkings[0].closest("td").append(alert);
            return false;
        }
    }
    isSelect(name){
        const seled = this.form.querySelector(`[name=${name}]`);
        const seledIndex = seled.options.selectedIndex;
        const seledVal = seled.options[seledIndex].value;

        if(seledVal !== ""){
            const errMsgs = seled.closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) seled.closest("td").querySelector("p").remove();
            return true;
        } else {
            const errMsgs = seled.closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) seled.closest("td").querySelector("p").remove();

            const alert = document.createElement("p");
            alert.append(`필수 항목을 선택하세요.`);
            seled.closest("td").append(alert);
            return false;
        }
    }
    isPwd(name1, name2, len){
        const input1 = this.form.querySelector(`[name=${name1}]`);
        const input2 = this.form.querySelector(`[name=${name2}]`);
        const txt1 = input1.value;
        const txt2 = input2.value;

        const num = /[0-9]/;
        const eng = /[a-zA-Z]/;
        const spc = /[~!@\#$%<>^&*\()\-=+_\’]/;

        if(txt1===txt2 && txt1.length>len && num.test(txt1)&&eng.test(txt1)&&spc.test(txt1)){
            const errMsgs = input1.closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) input1.closest("td").querySelector("p").remove();
            return true;
        } else {
            const errMsgs = input1.closest("td").querySelectorAll("p");
            if(errMsgs.length > 0) input1.closest("td").querySelector("p").remove();

            const alert = document.createElement("p");
            alert.append(`비밀번호는 영문,숫자,특수문자를 모두 포함한 ${len}글자 이상으로 입력하세요.`);
            input1.closest("td").append(alert);
            return false;
        }
    }
}