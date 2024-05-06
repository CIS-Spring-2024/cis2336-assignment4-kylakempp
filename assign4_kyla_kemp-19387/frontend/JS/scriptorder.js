document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalPriceElement = document.getElementById('totalPrice');
    const orderForm = document.getElementById('orderForm');
    const errorContainer = document.getElementById('errorContainer');
    const modalOverlay = document.getElementById('modalOverlay');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const price = parseFloat(this.dataset.price) || 0; 
            // Defaults to 0 if price is NaN
            const isChecked = this.checked;

            const quantityText = this.parentNode.querySelector('.quantity-text');
            if (quantityText) {
                if (isChecked) {
                    quantityText.classList.remove('hidden');
                    quantityText.style.opacity = '1'; 
                    const quantityInput = quantityText.querySelector('input[type="number"]');
                    if (quantityInput) {
                        quantityInput.value = 1; 
                        // Resets quantity to 1 when re-checked
                    }
                } else {
                    quantityText.style.opacity = '0'; 
                    setTimeout(() => {
                        quantityText.classList.add('hidden');
                    }, 300); 
                }
            }

            updateOrder();
        });
    });

    document.addEventListener('input', function (event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'input' && target.type === 'number') {
            updateOrder();
        }
    });

    function updateOrder() {
        const selectedItems = [];
        const errorMessages = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                const itemName = checkbox.value;
                const quantityInput = checkbox.parentNode.querySelector('input[type="number"]');
                const quantity = parseInt(quantityInput.value) || 0; 
                // Defaults to 0 if quantity is NaN
                const price = parseFloat(checkbox.dataset.price) || 0; 
                // Defaults to 0 if price is NaN

                if (quantity <= 0 || quantity > 10) {
                    errorMessages.push(`Invalid quantity for ${itemName}. Quantity must be between 1 and 10.`);
                    quantityInput.classList.add('error');
                } else {
                    quantityInput.classList.remove('error');
                }

                selectedItems.push({ name: itemName, quantity: quantity, price: price });
            }
        });

        //  total price
        const totalPrice = selectedItems.reduce((total, item) => total + (item.quantity * item.price), 0);


        totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);

        // Displays error messages
        errorContainer.innerHTML = '';
        if (errorMessages.length > 0) {
            errorMessages.forEach(message => {
                const errorElement = document.createElement('p');
                errorElement.textContent = message;
                errorContainer.appendChild(errorElement);
            });
            errorContainer.classList.add('visible');
            orderForm.classList.add('invalid');
        } else {
            errorContainer.classList.remove('visible');
            orderForm.classList.remove('invalid');
            displayOrderSummary(selectedItems);
        }
    }

  

    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        modalOverlay.style.display = "flex"; 
        // Shows popup
    });

    document.getElementById("closeModal").addEventListener("click", function() {
        modalOverlay.style.display = "none"; 
        // Hide popup
    });
});
