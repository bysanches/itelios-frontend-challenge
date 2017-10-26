
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
        `<div class="product card col-1">
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

const addToggleActions = card => {
    card.addEventListener('mouseover', () => {
        show(card.querySelector('.actions'));
    });
    card.addEventListener('mouseout', () => {
        hide(card.querySelector('.actions'));
    });
};

const hide = el => el.style.display = 'none';

const show = el => el.style.display = 'block';

const clear = parent => {
    let children = parent.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.remove();
    }
};

class Carousel {
    constructor(size, selector, paginationSelector) {
        this.size = size;
        this.element = document.querySelector(selector);
        this.items = Array.from(this.element.children);
        this.paginationElement = document.querySelector(paginationSelector);
        
        this.renderPagination();
        this.paginate(1);
    }

    paginate(page) {
        for (let i = 0; i < this.items.length; i++) {
            hide(this.items[i]);
        }

        let toShow = this.items.slice((page - 1) * this.size, this.size * page);
        for (let i = 0; i < toShow.length; i++) {
            show(toShow[i]);
        }
        
        this.resetActive();
        this.paginationElement.children[page - 1].className = 'active';
    }

    resetActive() {
        let elements = this.paginationElement.querySelectorAll('.active');
        for (let i = 0; i < elements.length; i++) {
            elements[i].className = '';
        }
    }

    renderPagination() {
        let el = this.paginationElement;
        clear(el);
        let pageCount = Math.ceil(this.items.length / this.size);
        let self = this;

        for (let i = 0; i < pageCount; i++) {
            let page = i + 1;
            let li = document.createElement('li');
            li.addEventListener('click', e => {
                self.paginate(page);
                e.preventDefault();
            });
            el.appendChild(li);
        }
    }

    setSize(newSize) {
        this.size = newSize;
        this.renderPagination();
        this.paginate(1);
    }
}

const breakpoint = 576;


fetchProducts(data => {
    let visitedItem = data[0].data.item;
    document.getElementById('visited').innerHTML = renderProduct(visitedItem);

    let recommendation = data[0].data.recommendation;
    let recommendationHtml = recommendation.reduce((html, item) => html += renderProduct(item), '');
    document.getElementById('recommendation').innerHTML = recommendationHtml;

    let size = 3;
    if (window.innerWidth < breakpoint) {
        size = 1;
    }
    let carousel = new Carousel(size, '#recommendation', '#recommendation-pagination');

    window.addEventListener('resize', e => {
        let size = 3;
        if (window.innerWidth < breakpoint) {
            size = 1;
        }
        carousel.setSize(size);
    });
})