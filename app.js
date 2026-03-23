let cart = []; // this is our empty array for the items

// Caching items from the HTML
let itemInput = document.getElementById("itemInput");
let addItemButton = document.getElementById("addItemButton");
let cartList = document.getElementById("cart");

// Our button fuctionalities
 
addItemButton.addEventListener("click", function () {
  let item = itemInput.value;
 
  if (item === "") {
    alert("Please enter an item.");
    return;
  }
 
  cart.push(item); // Add item to cart array
  renderCart();
  itemInput.value = ""; // Clear the input field
});
 
 // This function recreates the "shopping cart" every time an item is added or removed
function renderCart() {
  cartList.innerHTML = ""; // Clear existing list
  for (let i = 0; i < cart.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerText = cart[i];
    cartList.appendChild(listItem);
  }
}