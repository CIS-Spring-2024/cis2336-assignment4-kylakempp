function openMenu(evt, menuName) {
    var i, tabcontent, tablinks;

    // Hides all elements with class "menu-tab"
    tabcontent = document.getElementsByClassName("menu-tab");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("show");
    }

    // Removes "active" class from all elements with class "tablinks"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    // Shows current tab, and add an "active" class to the button that opened the tab
    document.getElementById(menuName).classList.add("show");
    evt.currentTarget.classList.add("active");
  }

  document.addEventListener("DOMContentLoaded", function() {
    var quantityInputs = document.querySelectorAll('input[type="number"]');

   quantityInputs.forEach(function(input) {
    input.addEventListener("input", function() {
    var quantity = parseInt(this.value);
    var price = parseFloat(this.dataset.price);
    var totalPrice = quantity * price;
    var parentFoodItem = this.closest('.food-item');
    var priceElement = parentFoodItem.querySelector('.food-details p');
    
    if (!isNaN(totalPrice) && totalPrice >= 0) {
      priceElement.textContent = '$' + totalPrice.toFixed(2);
     } else {
      priceElement.textContent = '$' + price.toFixed(2);
     }
    });
  });
});
