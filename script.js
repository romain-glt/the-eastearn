// === PRELOADER ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    preloader.style.transition = "opacity 0.5s ease";
  }
});

// === BURGER MENU ===
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close menu on link click (mobile)
    document.querySelectorAll(".navbar a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});
const cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");

    itemEl.innerHTML = `
      <span>${item.name}</span>
      <span>
        ${item.price.toLocaleString()}₫ 
        <button class="remove-item" data-index="${index}" title="Remove item">❌</button>
      </span>
    `;

    cartItemsContainer.appendChild(itemEl);
    total += item.price;
  });

  cartTotal.textContent = `${total.toLocaleString()}₫`;

  // Gestion des suppressions
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.index);
      cart.splice(index, 1); // Supprime l'article du tableau
      updateCart(); // Recharge l'affichage du panier
    });
  });
}




document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "New Order:\n";
  cart.forEach(item => {
    message += `- ${item.name}: ${item.price}₫\n`;
  });

  message += `\nTotal: ${cart.reduce((sum, item) => sum + item.price, 0)}₫`;

  document.getElementById("order-details").value = message;
  document.getElementById("order-form").submit();


  // Optionally: send via email service, or generate downloadable receipt
});
