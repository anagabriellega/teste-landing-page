/* scripts.js */
document.addEventListener('DOMContentLoaded', function () {
    const paymentButtons = document.querySelectorAll('#pagamento .btn-pink-600');
    const confirmButton = document.querySelector('#pagamento .btn-success');

    let selectedPaymentMethod = '';

    paymentButtons.forEach(button => {
        button.addEventListener('click', function () {
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedPaymentMethod = this.innerText;
        });
    });

    confirmButton.addEventListener('click', function () {
        if (selectedPaymentMethod) {
            alert(`Compra confirmada com pagamento via ${selectedPaymentMethod}!`);
        } else {
            alert('Por favor, selecione um método de pagamento.');
        }
    });
});
