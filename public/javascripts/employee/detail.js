const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

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
