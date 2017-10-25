
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

const renderProduct = item => {
    return (
        `<div class="product">
            <img src="${getImageUrl(item.imageName)}" alt="">
            <p>${item.name}</p>
            <div>Por: <span class="price">${item.price}</span></div> 
            <div>
                <span class="paymentConditions">
                    ${item.productInfo.paymentConditions}
                </span>
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
})