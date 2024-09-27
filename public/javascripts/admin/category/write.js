const write_btn = document.querySelector('.section .write_btn');
const firstCategory = document.querySelector('.section .first_category')
const secondCategory = document.querySelector('.section .second_category')

write_btn.addEventListener('click',()=>{
  let param = {};
  if(firstCategory.value == ''){
    alert('1차 카테고리를 선택해 주세요');
    return false;
  }

  if(secondCategory.value == ''){
    alert('2차 카테고리를 선택해 주세요');
    return false;
  }

  param.first_category = firstCategory.value;
  param.first_category_input = document.querySelector('.section input[name="first_category_input"]').value;
  param.second_category = secondCategory.value
  param.second_category_input = document.querySelector('.section input[name="second_category_input"]').value;

  if(confirm('저장하시겠습니까?')){
    fetch('/admin/category/write',{
      method : 'post'
      ,body : JSON.stringify(param)
      ,headers : {
        'content-type' : 'application/json'
      }
    })
    .then((res)=> res.json())
    .then((res)=>{
      if(res.result){
        alert('저장되었습니다.');
        location.href = '/admin/category/list'
      }
      if(!res.result){
        alert(res.errMessage);
        return false;
      }
    })
    .catch(()=>{
      alert('오류가 발생하였습니다.');
      return false;
    })
  }

  console.log(firstCategory.value)
})

function change_input (el){
  console.log(el)
  let className = 'first_category';
  if(el.classList.contains('second_category')){
    className = 'second_category'
  }
  className += '_input'
  const input = document.querySelector('.section input[name="'+className+'"]');
  input.value = ''
  if(el.value === 'a'){
    input.disabled = false;
  }else{
    input.disabled = true;
  }
  if(className == 'first_category_input'){
    secondCategory.value = el.value == 'a' ? el.value : '';
    change_input(secondCategory);
  }
}