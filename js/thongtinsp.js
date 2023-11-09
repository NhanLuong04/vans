function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();


let imgList = document.querySelectorAll('.zoomer img')
let mirror = document.querySelector('#mirror')
let scope = 4

imgList.forEach(function(img){
    img.addEventListener('mousemove', function(e){
        mirror.classList.remove('hide')
        var percentMouseOfWidth = (e.offsetX / this.offsetWidth) * 100
        var percentMouseOfHeight = (e.offsetY / this.offsetHeight) * 100   
        mirror.style.top = `${e.clientY}px`
        mirror.style.left = `${e.clientX}px`   
        mirror.style.backgroundSize = '800px 800px'   
        mirror.style.backgroundPosition = `${percentMouseOfWidth}% ${percentMouseOfHeight}%`
    })

    img.addEventListener('mouseleave', function(e){
        mirror.classList.add('hide')
    })

})

let amountElement = document.getElementById('amount');
let amount = amountElement.value;
// console.log(amount);
let render = (amount) =>   {
    amountElement.value = amount
}
// Handle Plus
let handlePlus = () =>{
    console.log(amount);
    amount++
    render(amount);
}

//Handle Minus
let handleMinus = () =>{
    console.log(amount);
    if (amount > 1)
    amount--;
    render(amount);
}

amountElement.addEventListener('input', ()=>{
    console.log(amount);
    amount = amountElement.value;
    amount = parseInt(amount);
    amount = (isNaN(amount)|| amount==0)?1:amount;
    render(amount);
    console.log(amount);
})
//Add Cart
let getSize = document.querySelectorAll('.sizeShoes');
let tempValueSize = document.getElementById('tempValueSize').value;
getSize.forEach((size) => {
    size.addEventListener('click', (event) => {
        let target = event.target;
        tempValueSize = target.value;
    })
})
let orderBtn = document.querySelector('.orderBtn');
orderBtn.addEventListener('click',(event) => {
    let btnTarget = event.target;
    let buyNow = btnTarget.parentElement;
    let cartQuantity = buyNow.parentElement;
    let totalCart = cartQuantity.parentElement;
    let botSize = totalCart.parentElement;
    let colCart = botSize.parentElement;

    let nameProduct = colCart.querySelector('.tieude h2').innerText;
    let priceProduct = colCart.querySelector('.cost').innerText
    let idProduct = colCart.querySelector('.masp .idPro').innerText
    let imgProduct = document.querySelector('.zoomer img').src
    let quantity = document.getElementById('amount').value
    addToCart(idProduct, nameProduct,imgProduct,priceProduct,quantity)
})
function addToCart(idProduct, nameProduct,imgProduct,priceProduct,quantity) {
    let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    let tempValueSize = document.getElementById('tempValueSize').value;
    let id = idProduct;
    let checkProduct = products.some(value => value.id === id);
    if(!checkProduct){
      products.push({
        id:idProduct,
        name:nameProduct,
        img:imgProduct,
        price:priceProduct,
        quantity:quantity,
      })
      localStorage.setItem('products', JSON.stringify(products));
      renderCart();
    }
    else {
        let product = products.find(value => value.id === id);
        let getIndex = products.findIndex(value => value.id === id);
        products[getIndex] = {
          ...product,
          quantity:++product.quantity
        };
        localStorage.setItem('products', JSON.stringify(products));
        renderCart();
      }
}
function renderCart(){
    let showCart = '';
    let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    products.map((value,index) => {
        showCart+=`
        <td class="inf-pro">
        <img class="img-sp" src="${value.img}">
        <div class="inf-pro-right">
            <a href="Product-details.html">VANS AUTHENTICS CLASSIC BLACK/WHITE</a>
            <span class="size">40.5</span>
            <span class="price">${value.price}₫</span>
        </div>
        </td>
        <td class="soluong"> 
            <button>-</button>
            <span class="quantity">${value.quantity}</span>
            <button>+</button>
        </td>
        <td> 
            <span class="pro-price">1.450.000₫</span>
        </td>
        <td class="xoa-sp">
            <i class="fa-solid fa-x" style="color: #0a0a0a;"></i>
        </td>
        `
    })
    let bot = document.querySelector('.cartTab')
    console.log(bot)
}




