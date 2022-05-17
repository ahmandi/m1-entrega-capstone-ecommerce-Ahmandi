let removeBtn = document.getElementsByClassName('btn__remove');
let listaProdutos = [];

function criarProdutos(produtos){
    const productShowcase    = document.querySelector('.showcase')

    for(let i = 0; i < produtos.length; i++){
        let productCard        = document.createElement('li')
        let productMain        = document.createElement('main')
        let productImg         = document.createElement('img')
        let productType        = document.createElement('div')
        let productBorder      = document.createElement('div')
        let productTitle       = document.createElement('h1')
        let productDescription = document.createElement('h3')
        let productValue       = document.createElement('h4')
        let productCart        = document.createElement('h5')
        let productId          = document.createElement('id')

        productCard.classList.add('card')
        productMain.classList.add('main')
        productImg.classList.add('product__img')
        productType.classList.add('product__type', 'gap')
        productBorder.classList.add('border')
        productTitle.classList.add('strong', 'gap')
        productDescription.classList.add('description', 'gap')
        productValue.classList.add('value', 'gap')
        productCart.classList.add('add__cart', 'btn')

        productImg.src               = produtos[i].img
        productId.id                 = produtos[i].id
        productType.innerText        = produtos[i].tag[0]
        productTitle.innerText       = produtos[i].nameItem
        productDescription.innerText = produtos[i].description
        productValue.innerText       = produtos[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        productCart.innerText        = produtos[i].addCart

        productMain.append(productType, productTitle, productDescription, productValue, productCart)
        productBorder.append(productImg, productMain)
        productCard.appendChild(productBorder)
        productShowcase.appendChild(productCard)

        productCart.addEventListener('click', function(event){
            listaProdutos.push(produtos[i])
            criarProdutosCart(listaProdutos);
        })
    }
}
criarProdutos(data)


function criarProdutosCart(){
    let limpar = document.querySelector('.checkout__box');
    limpar.innerHTML = "";

    for(let i = 0; listaProdutos.length; i++){
        let productsBox = document.querySelector('.checkout__box')

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
        
        productImg.src         = listaProdutos[i].img
        productInfo.innerText  = listaProdutos[i].nameItem
        productValue.innerText = listaProdutos[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        productRemove.id       = listaProdutos[i].id
        productRemove.innerText= 'Remover'

        productBox.append(productInfo, productValue, productRemove)
        productItem.append(productImg, productBox)
        productsBox.appendChild(productItem)
        
        for(let i = 0; i < removeBtn.length; i++){
            removeBtn[i].addEventListener('click', removeItem)
        }
    }
}

function removeItem(event){
    removeBtn = event.target;
    removeBtn_grandParent = removeBtn.parentElement.parentElement
    removeBtn_grandParent.remove();

    listaProdutos.splice(listaProdutos.indexOf(removeBtn), 1)
}