let title    = document.getElementById('title'),
    price    = document.getElementById('price'),
    taxes    = document.getElementById('taxes'),
    ads      =   document.getElementById('ads'),
    discount =   document.getElementById('discount'),
    total =   document.getElementById('total'),
    count =   document.getElementById('count'),
    category =   document.getElementById('category'),
    submit =   document.getElementById('submit'),
    search =   document.getElementById('search'),
    searchTitle =   document.getElementById('s-title'),
    searchCategory =   document.getElementById('s-category')
    ;
    let mode = 'create';
    let temp;
    let searchMode ='title';
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ='#040'
    }
    else{
        total.innerHTML ='';
        total.style.background ='#a00d02'
    }
}

let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}
else{
 dataPro =[];
}

 submit.onclick= function(){
  let newPro ={
      title:title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value.toLowerCase(),
  }
  if(title.value != '' && price.value !='' && category.value !='' && newPro.count <100){
  if(mode === 'create'){
    if(newPro.count >1){
        for(let x=0 ;x <newPro.count ;x++){
          dataPro.push(newPro);
        }}
        else{
          dataPro.push(newPro);
        }
  }
  else{
      dataPro[temp] =newPro;
      mode ='create';
      submit.innerHTML ='create';
      count.style.display ='block'
  }
  clearData();
}

  
  
  localStorage.setItem('product',JSON.stringify(dataPro));
  showData();

}
function clearData(){
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}

function showData(){
    getTotal();
    let table ='';
    for(let i =0 ; i<dataPro.length ;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="delete">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete= document.getElementById('delete-all');
    if(dataPro.length > 0){
        btnDelete.innerHTML =` <button onclick="deleteAll()"> delete All ( ${dataPro.length} ) </button>`;
       }
     else{ btnDelete.innerHTML=' ' ;}
    }
   
    showData();

  
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product =JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display ='none';
    submit.innerHTML ='update';
    mode ='update';
    temp =i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

function getSearchMode(id){

 if(id == 's-title'){
     searchMode = 'title';
     
 }else{
     searchMode ='category';
 }
 search.placeholder ='search By ' + searchMode;
  search.focus();
  search.value ='';
  showData
}

function searchData(value){
    let table ='';
    if(searchMode == 'title'){
        for(let i=0 ;i<dataPro.length ;i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="delete">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                
            }
        }
    }
    else{
        for(let i=0 ;i<dataPro.length ;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="delete">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}
