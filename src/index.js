
const fetchProducts = (callback) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        let json = JSON.parse(xhr.responseText);
        callback(json);
    });
    xhr.open('GET', 'products.json')
    xhr.send();
};

const getImageUrl = url => {
    const imageName = url.substring(url.lastIndexOf('/') + 1);
    return `images/${imageName}`;
};

const renderPaymentConditions = conditions => {
    let rgx = /(\dx de R\$ \d+,\d{2})/;
    return conditions.replace(rgx, part => `<span class="payment-conditions">${part}</span>`)
};

const renderProduct = item => {
    return (
        `<div class="product card col-md">
            <div class="card-body">
                <img src="${getImageUrl(item.imageName)}">
                <p class="card-text">${item.name}</p>
                <div>Por: <span class="price">${item.price}</span></div> 
                <div>
                    <span class="paymentConditions">
                        ${renderPaymentConditions(item.productInfo.paymentConditions)}
                    </span>
                </div>
            </div>
            <div class="actions">
                <button type="button" class="btn">
                    adicionar ao carrinho
                    <i class="material-icons">add_shopping_cart</i>
                </button>
            </div>
        </div>`
    );
};

fetchProducts(data => {
    let visitedItem = data[0].data.item;
    document.getElementById('visited').innerHTML = renderProduct(visitedItem);

    let recommendation = data[0].data.recommendation;
    let recommendationHtml = recommendation.slice(0, 3).reduce((html, item) => html += renderProduct(item), '');
    document.getElementById('recommendation').innerHTML = recommendationHtml;
    
    function addToggleActions(card) {
        card.addEventListener('mouseover', () => {
            card.querySelector('.actions').style.display = 'block';
        });
        card.addEventListener('mouseout', () => {
            card.querySelector('.actions').style.display = 'none';
        });
    }

    let cards = document.querySelectorAll('.card');
    for (let card of cards) {
        addToggleActions(card);
    }
})