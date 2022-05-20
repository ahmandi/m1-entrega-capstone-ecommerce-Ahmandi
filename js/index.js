let removeBtn               = document.getElementsByClassName('btn__remove');
let removal                 = document.getElementById('removal');
const productShowcase       = document.querySelector('.showcase')
const searchBar = document.getElementById("searchBar")
const navigation = document.querySelector('.nav__list')
navigation.addEventListener("click", filterPage)
removal.addEventListener('click', removeItem)

let listaProdutosCarrinho = [];

function criarProdutos(produtos){
    for(let i = 0; i < produtos.length; i++){
        let productCard        = document.createElement('li')
        let productMain        = document.createElement('main')
        let productImg         = document.createElement('img')
        let productType        = document.createElement('div')
        let productBorder      = document.createElement('div')
        let productTitle       = document.createElement('h1')
        let productDescription = document.createElement('h3')
        let productValue       = document.createElement('h4')
        let productCart        = document.createElement('button')

        productCard.classList.add('card')
        productMain.classList.add('main')
        productImg.classList.add('product__img')
        productType.classList.add('product__type', 'gap')
        productBorder.classList.add('border')
        productTitle.classList.add('strong', 'gap')
        productDescription.classList.add('description', 'gap')
        productValue.classList.add('value', 'gap')
        productCart.classList.add('add__cart', 'btn')
        productCart.addEventListener('click', addItem)
        
        productImg.src               = produtos[i].img
        productType.innerText        = produtos[i].tag
        productTitle.innerText       = produtos[i].nameItem
        productDescription.innerText = produtos[i].description
        productValue.innerText       = produtos[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        productCart.innerText        = produtos[i].addCart
        productCart.id               = produtos[i].id
        
        productMain.append(productType, productTitle, productDescription, productValue, productCart)
        productBorder.append(productImg, productMain)
        productCard.appendChild(productBorder)
        productShowcase.appendChild(productCard)
    }
}
criarProdutos(data)

function criarProdutosCart(){
    let limpar = document.querySelector('.checkout__box');
    limpar.innerHTML = "";

      for(let i = 0; i < listaProdutosCarrinho.length; i++){
        let productsBox   = document.querySelector('.checkout__box')

        let productImg    = document.createElement('img')
        let productInfo   = document.createElement('div')
        let productItem   = document.createElement('div')
        let productBox    = document.createElement('div')
        let productValue  = document.createElement('p')
        let productRemove = document.createElement('button')

        productItem.classList.add('itemBox')
        productBox.classList.add('infoBox')
        productImg.classList.add('small')
        productInfo.classList.add('type')
        productValue.classList.add('value', 'gap')
        productRemove.classList.add('btn__remove', 'btn')
        
        productImg.src         = listaProdutosCarrinho[i].img
        productInfo.innerText  = listaProdutosCarrinho[i].nameItem
        productValue.innerText = listaProdutosCarrinho[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        productRemove.id       = listaProdutosCarrinho[i].id
        productRemove.innerText= 'Remover produto'

        productBox.append(productInfo, productValue, productRemove)
        productItem.append(productImg, productBox)
        productsBox.appendChild(productItem)
    }
}

function addItem(event){
    let productId       = event.target.id
    let productReceiver = data.find(item => item.id == productId)
    
    listaProdutosCarrinho.push(productReceiver)
    totalUpdate(listaProdutosCarrinho)
    criarProdutosCart()
}

function removeItem(event){
    let removeBtn   = event.target;
    const productId = removeBtn.id
    removeBtn.closest('.itemBox').remove()

    const indice = listaProdutosCarrinho.findIndex(produto => produto.id == productId)
    listaProdutosCarrinho.splice(indice, 1)
    totalUpdate(listaProdutosCarrinho)
    criarProdutosCart()
}

function totalUpdate(listaProdutosCarrinho){
    const itemQty   = document.querySelector('.itemQuantity')
    const itemTotal = document.querySelector('.itemTotal')
    
    let quantidade = listaProdutosCarrinho.length
    let precoTotal = 0

    listaProdutosCarrinho.forEach(item => {
        precoTotal += Number(item.value)
    })

    itemTotal.innerText = `${precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

    itemQty.innerText   = quantidade
}

function filterPage(event){
    productShowcase.innerHTML = '';
    const arr  = [];

    const type = event.target;

    if(type.id === 'Todos'){
        criarProdutos(data)
     } else if (type.id == 'Acessórios'){
        data.filter((item) => {
            if(item.tag == 'Acessórios'){
                arr.push(item)
            }
        })
    } else if (type.id == 'Camisetas'){
        data.filter((item) => {
            if(item.tag == 'Camisetas'){
                arr.push(item)
            }
        })
    } else {
        productShowcase.innerText = 'Produto não encontrado... :('
    }
    criarProdutos(arr)
}

function searchBox(){
        searchBar.addEventListener('keyup', function(e){
            filteredSearch(e.target.value, data)
        })
}
searchBox()

function filteredSearch(input, data){
    let inputTratada = input.toLowerCase()
    let arr = [];
    productShowcase.innerHTML = '';

    data.filter((item) => {
        if(item.nameItem.toLowerCase().includes(inputTratada)){
            arr.push(item)
            productShowcase.innerHTML = '';
        }
    })
    criarProdutos(arr)
}