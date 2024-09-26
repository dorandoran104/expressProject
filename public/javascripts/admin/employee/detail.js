const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

document.querySelectorAll('input.date_input').forEach((el)=>{
    el.addEventListener('input',()=>{
        let value = el.value;
        value = value.replace(/\D/g, '');
        if (value.length > 4) {
        value = value.slice(0, 4) + '-' + value.slice(4);
        }
        if (value.length > 7) {
        value = value.slice(0, 7) + '-' + value.slice(7, 9);
        }
        el.value = value;
    })

    el.addEventListener('blur',()=>{
        let value = el.value;
        if(!date_reg.test(value)){
            alert('유효하지 않은 날짜입니다.');
            return false;
        }
    })
})

document.querySelector('button.history_back').addEventListener('click',()=>{
    history.back();
})

document.querySelector('button.write_btn').addEventListener('click',()=>{
    const inputs = document.querySelectorAll('.needs-validation input');
    console.log(inputs);
    let param = {};
    for(let i = 0; i<inputs.length ; i++){
        const input = inputs[i];
        const name = input.getAttribute('name');
        const value = input.value;
        if(name != 'end_date' && name != 'password'){
            if(value == null || value == ''){
                alert('빈값이 존재합니다.');
                return false;
            }
        }
        if(input.classList.contains('date_input') && value != '' && !date_reg.test(value)){
            alert('유효하지 않은 날짜가 존재합니다.');
            return false;
        }

        if(name == 'email' && !email_reg.test(value)){
            alert('유효하지 않은 이메일이 존재합니다.');
            return false;
        }
        param[name] = value;
    }
    
    if(confirm('저장하시겠습니까?')){
        fetch('/admin/employee/' + param.code,{
            method : 'put'
            ,headers : {
                'content-type' : 'application/json'
            }
            ,body : JSON.stringify(param)
        }).then((res)=> res.json())
        .then((res)=>{
            if(res.result){
                alert('저장되었습니다.');
                location.reload();
            }
            if(!res.result){
                alert(res.errMessage);
                return false;
            }
        })
        .catch((err)=>{
            alert('저장에 실패하였습니다.');
            return false;
        })
    }
})
