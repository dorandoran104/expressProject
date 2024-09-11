let button = document.querySelector('button.submit');

button.addEventListener('click',()=>{
    login();
})

function login(){
    let email = document.querySelector('input[name="email"]');
    let password = document.querySelector('input[name="password"]');

    if(email.value == ''){
        alert('이메일을 입력해 주세요');
        return false;
    }
    if(password.value == ''){
        alert('비밀번호를 입력해 주세요');
        return false;
    }

    let param = {};
    param.email = email.value;
    param.password = password.value;

    fetch('/login',{
        method : 'post'
        ,body : JSON.stringify(param)
        ,headers : {
            'content-type' : 'application/json'
        }
    }).then((res)=> res.json())
    .then((res)=>{
        console.log(res);
        if(res.result){
            location.href = '/'
        }
        if(!res.result){
            alert('아이디 또는 비밀번호를 확인해주세요');
            return false;
        }
    })

}