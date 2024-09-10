
const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;


let button = document.querySelector("button.write_btn");

button.addEventListener('click',()=>{
    const table = document.querySelector("table");
    const inputs = table.querySelectorAll('input');

    let param = {};
    for(let i = 0; i<inputs.length; i++){
        const input = inputs[i];
        if(input.value == null || input.value == ''){
            alert('빈값이 존재합니다.');
            input.focus();
            return false;
        }
        param[input.getAttribute('name')] = input.value;
    }

    fetch("/employee/write",{
        method : "post"
        ,body : JSON.stringify(param)
        ,headers : {
            'content-type' : 'application/json'
        }
    }).then((res)=> res.json())
    .then((res)=>{
        if(res.result){
            alert('저장되었습니다.');
            location.href = '/employee/list';
        }
        if(!res.result){
            alert(res.errMessage);
            return false;
        }
    })
})

//focus 이벤트
document.querySelector('input[name="email"]').addEventListener('blur',(e)=>{
    console.log(e.target);
    if(e.target.value.length > 0 && !email_reg.test(e.target.value)){
        alert('유효하지 않은 이메일 입니다.');
        return false;
    }
},true);

document.querySelector('input[name="birth_date"]').addEventListener("input",(e)=>{
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 4) {
    value = value.slice(0, 4) + '-' + value.slice(4);
    }
    if (value.length > 7) {
    value = value.slice(0, 7) + '-' + value.slice(7, 9);
    }
    e.target.value = value;
})

document.querySelector('input[name="birth_date"]').addEventListener('blur',(e)=>{
    if(e.target.value.length > 0 && !date_reg.test(e.target.value)){
        alert('유효하지 않은 날짜 형식 입니다.');
        return false;
    }
})

document.querySelector('input[name="mobile_number"]').addEventListener('input',(e)=>{
    e.target.setAttribute('maxlength',13);
    let value = e.target.value;
    value = e.target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    e.target.value = value;
})

document.querySelector('input[name="mobile_number"]').addEventListener('blur',(e)=>{
    if(e.target.value.length > 0 && !phone_reg.test(e.target.value)){
        alert('유효하지 않은 핸드폰번호 입니다.');
        return false;
    }
})

