const section = document.querySelector('.section');
const write_btn = document.querySelector('.write_btn')
const file_input = section.querySelector('input[type="file"]');
const imageFilePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

const totalPriceInput = document.querySelector('.section input[name="total_price"]');
const priceInput = document.querySelector('.section input[name="price"]');
const taxInput = document.querySelector('.section input[name="tax"]');

//가격 입력시 자동입력
priceInput.addEventListener('input',(e)=>{
    e.target.setAttribute('maxlength','13');
    let value = e.target.value.replaceAll(',','');
    e.target.value = addCommasToNumber(value)

    const tax = parseInt(value / 10);
    taxInput.value = addCommasToNumber(tax);

    totalPriceInput.value = addCommasToNumber(Number(value) + Number(tax));
})

//총 가격 입력시 자동 입력
totalPriceInput.addEventListener('input',(e)=>{
    e.target.setAttribute('maxlength','13');
    let value = e.target.value.replaceAll(',','');
    e.target.value = addCommasToNumber(value);

    const price = parseInt(Math.round(value / 1.1));
    priceInput.value = addCommasToNumber(price);
    taxInput.value = addCommasToNumber(Number(value) - Number(price))
})

//부가세 입력시 자동 입력
taxInput.addEventListener('input',(e)=>{
    e.target.setAttribute('maxlength','13');
    const value = e.target.value.replaceAll(',','');
    e.target.value = addCommasToNumber(value);

    const price = parseInt(value * 10);
    priceInput.value = addCommasToNumber(price);
    totalPriceInput.value = addCommasToNumber(Number(price) + Number(value));
})

//체크 인풋
document.querySelectorAll('label.pointer').forEach((el)=>{
    el.addEventListener('click',(e)=>{
        const input = e.target.previousElementSibling;
        input.checked = !input.checked;
    })
})

//저장
write_btn.addEventListener('click',()=>{
    let section = document.querySelector('.section');

    const inputs = section.querySelectorAll('input[type="text"]');
    let formData = new FormData();

    let blankFlag = false;
    inputs.forEach((el)=>{
        if(el.value == null || el.value == '') blankFlag = true;
        formData.append(el.getAttribute('name'),el.value);
    })

    const checkbox = section.querySelectorAll('input[type="checkbox"]');
    checkbox.forEach((el)=>{
        formData.append(el.getAttribute('name'),el.checked ? 'Y' : 'N');
    })

    let imageArray = [];
    const files = section.querySelector('input[type="file"]').files;
    console.log(files);
    for(let i = 0 ; i<files.length ; i++){
        formData.append('files',files[i])
    }
    if(confirm('저장하시겠습니까?')){
        fetch('/admin/goods/write',{
            method : 'post',
            body : formData,
        }).then((res)=> res.json())
        .then((res)=>{
            if(res.result){
                alert('저장되었습니다.');
                location.href('/admin/goods/list')
            }
            if(!res.result){
                alert(res.errMessage)
                return false;
            }
        }).catch(err=>{
            alert('저장에 실패하였습니다.')
            return false;
        })
    }
})

//파일 추가시
file_input.addEventListener('change',(e)=>{
    let file = e.target.files[0];

    if(!imageFilePattern.test(file.name)){
        alert('이미지 파일만 등록할 수 있습니다.');
        e.target.value = '';
        return false;
    }

    if(file.size == 0){
        alert('유효하지 않은 파일을 업로드 할 수 없습니다.');
        e.target.value = '';
        return false;
    }

    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        // const div = document.createElement(div)
        // div.classList.add('col-md-4');
        // const span = document.createElement('span');
        // div.innerHTML+='<button type="button" class="btn-close" aria-label="Close"></button>'
        const imageBlock = document.createElement('img');
        // imageBlock.classList.add('thumbnail')
        // // const imageBlock = `<img src="" class="img-thumbnail" alt="...">`;
        const imgElement = document.querySelector('.img_area');
        // div.appendChild(imageBlock);
        imgElement.appendChild(imageBlock);
        imageBlock.src = e.target.result; // 미리보기 이미지를 설정
        // // imageBlock.style.display = 'block'; // 이미지 표시
        imageBlock.style.width = '180px';
        imageBlock.style.height = '180px';
        imageBlock.style.margin = '10px'
        // imageBlock
        
    };
})

