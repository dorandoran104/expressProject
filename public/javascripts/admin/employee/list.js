let button = document.querySelector(".add_btn > button");

button.addEventListener('click',()=>{
    location.href = '/admin/employee/write';
})

document.querySelectorAll('table tr.link').forEach((el)=>{
    let code = el.getAttribute('data-code');
    el.addEventListener('click',(e)=>{
        if(code == null ||code == '') return false;
        location.href = '/admin/employee/'+code;
    })
})