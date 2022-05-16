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


        productCard.classList.add('card')
        productMain.classList.add('main')
        productImg.classList.add('product__img')
        productType.classList.add('product__type', 'gap')
        productBorder.classList.add('border')
        productTitle.classList.add('strong', 'gap')
        productDescription.classList.add('description', 'gap')
        productValue.classList.add('value', 'gap')
        productCart.classList.add('add__cart')

        productImg.src               = produtos[i].img
        productType.innerText        = produtos[i].tag[0]
        productTitle.innerText       = produtos[i].nameItem
        productDescription.innerText = produtos[i].description
        productValue.innerText       = produtos[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        productCart.innerText        = produtos[i].addCart

        productMain.append(productType, productTitle, productDescription, productValue, productCart)
        productBorder.append(productImg, productMain)
        productCard.appendChild(productBorder)
        productShowcase.appendChild(productCard)
    }
}
criarProdutos(data)
console.log(data)