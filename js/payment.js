document.addEventListener('DOMContentLoaded', function() {
    const orderButton = document.querySelector('.products__button');
    const orderForm = document.querySelector('.products__form');
    const modalForm = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
    const size = document.querySelector('.products__select');
    const sizeOrder = document.querySelector('.modal__select');
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
    sizeOrder.addEventListener('change', function () {
        size.selectedIndex = this.selectedIndex;
    });
});