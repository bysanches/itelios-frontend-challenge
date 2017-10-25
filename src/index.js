
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

function addToggleActions(card) {
    card.addEventListener('mouseover', () => {
        show(card.querySelector('.actions'));
    });
    card.addEventListener('mouseout', () => {
        hide(card.querySelector('.actions'));
    });
}

function hide(element) {
    element.style.display = 'none';
}

function show(element) {
    element.style.display = 'block';
}

function clean(parent) {
    let children = Array.prototype.slice.call(parent.children);
    for (let child of children) {
        child.remove();
    }
}

class Carousel {
    constructor(size, selector, paginationSelector) {
        this.size = size;
        this.element = document.querySelector(selector);
        this.items = Array.prototype.slice.call(this.element.children);
        this.paginationElement = document.querySelector(paginationSelector);
        this.paginate(1);

        this.renderPagination();
    }

    paginate(page) {
        for (let item of this.items) {
            hide(item);
        }

        let toShow = this.items.slice((page - 1) * this.size, this.size * page);
        for (let item of toShow) {
            show(item);
        }
    }

    renderPagination() {
        let el = this.paginationElement;
        clean(el);
        let pageCount = Math.ceil(this.items.length / this.size);
        let self = this;

        for (let i = 0; i < pageCount; i++) {
            let page = i + 1;
            let link = document.createElement('a');
            link.href = '#';
            link.textContent = page;
            link.addEventListener('click', e => {
                self.paginate(page)
                e.preventDefault();
            });

            let li = document.createElement('li');
            li.appendChild(link);

            el.appendChild(li);
        }
    }

    setSize(newSize) {
        this.size = newSize;
        this.paginate(1);
        this.renderPagination();
    }
}

const breakpoint = 576;


fetchProducts(data => {
    let visitedItem = data[0].data.item;
    document.getElementById('visited').innerHTML = renderProduct(visitedItem);

    let recommendation = data[0].data.recommendation;
    let recommendationHtml = recommendation.reduce((html, item) => html += renderProduct(item), '');
    document.getElementById('recommendation').innerHTML = recommendationHtml;

    let cards = document.querySelectorAll('.card');
    for (let card of cards) {
        addToggleActions(card);
    }

    let size = 3;
    if (window.innerWidth < breakpoint) {
        size = 1;
    }
    let carousel = window.carousel = new Carousel(size, '#recommendation', '#recommendation-pagination');

    window.addEventListener('resize', e => {
        let size = 3;
        if (window.innerWidth < breakpoint) {
            size = 1;
        }
        carousel.setSize(size);
    });
})