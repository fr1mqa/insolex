const shopId = 607074;
const orderForm = document.querySelector('.products__form');
const $checkout = YandexCheckoutUI(shopId, {
    language: 'ru',
    amount: 3500
});
const submitHandler = function(e){
    e.preventDefault();
    $checkout.open();
};
orderForm.addEventListener('submit', submitHandler);