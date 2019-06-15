document.addEventListener('DOMContentLoaded', function() {
    const orderButton = document.querySelector('.products__button');
    const orderForm = document.querySelector('.products__form');
    const modalForm = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
    const size = document.querySelector('.products__select');
    const sizeOrder = document.querySelector('.modal__select');
    const sizeList = document.querySelector('.modal__list');
    const addButton = document.querySelector('.modal__add');
    closeModal.addEventListener('click', function () {
        modalForm.classList.remove('modal__show');
    });
    orderButton.addEventListener('click', function () {
        modalForm.classList.add('modal__show');
    });
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });
    size.addEventListener('change', function () {
        sizeOrder.selectedIndex = this.selectedIndex;
    });

    function addSizeField(e) {
        e.stopPropagation();
        let sizeItem = document.createElement('li');
        sizeItem.className = 'modal__item';
        sizeItem.innerHTML = '<div class="modal__size-wrapper"> <label class="modal__label" for="size">Размер(RUS)/Длина стопы(мм)</label> <select class="modal__select" name="orderDetails" id="size"> <option value="Размер 35 / 225">35 / 225</option> <option value="Размер 36 / 230">36 / 230</option> <option value="Размер 37 / 235">37 / 235</option> <option value="Размер 37.5 / 240">37.5 / 240</option> <option value="Размер 38 / 245">38 / 245</option> <option value="Размер 39 / 250">39 / 250</option> <option value="Размер 40 / 255">40 / 255</option> <option value="Размер 40.5 / 260">40.5 / 260</option> <option value="Размер 41 / 265">41 / 265</option> <option value="Размер 42 / 270">42 / 270</option> <option value="Размер 43 / 275">43 / 275</option> <option value="Размер 43.5 / 280">43.5 / 280</option> <option value="Размер 44 / 285">44 / 285</option> <option value="Размер 45 / 290">45 / 290</option> <option value="Размер 46 / 295">46 / 295</option> <option value="Размер 47 / 305">47 / 305</option> </select> </div> <div class="modal__count-wrapper"> <label class="modal__label" for="count">Кол-во</label> <input class="modal__count" type="number" min="1" id="count" value="1" required> </div><span class="modal__remove"></span>';
        sizeList.appendChild(sizeItem);
        recalculateCost();
        return false;
    }
    addButton.addEventListener('click', addSizeField);
    function removeSizeField(e) {
        if (e.target.className === 'modal__remove') {
            sizeList.removeChild(e.target.parentNode);
            recalculateCost();
        }
        return false;
    }
    sizeList.addEventListener('click', removeSizeField);
    function recalculateCost(e) {
        const sizeList = document.querySelectorAll('.modal__select');
        const modalCost = document.querySelector('.modal__price');
        const countList = document.querySelectorAll('.modal__count');
        const orderDetails = document.querySelector('input[name=orderDetails]');
        const sum = document.querySelector('input[name=sum]');
        let orderDetailsValue = '';
        let finalCost = 0;
        for (let i = 0; i < sizeList.length; i++) {
            orderDetailsValue += '[ ' + sizeList[i].value + ' x ' + countList[i].value + ' ] ';
            finalCost += 3500 * countList[i].value;
        }
        orderDetails.value = orderDetailsValue;
        sum.value = finalCost;
        modalCost.innerHTML = finalCost;
    }
    sizeList.addEventListener('change', recalculateCost);
});