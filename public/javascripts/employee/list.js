let button = document.querySelector("button");

button.addEventListener('click',()=>{
    location.href = '/employee/write';
})

document.querySelectorAll('table tr.link').forEach((el)=>{
    let code = el.getAttribute('data-code');
    el.addEventListener('click',(e)=>{
        if(code == null ||code == '') return false;
        location.href = '/employee/'+code;
    })
})