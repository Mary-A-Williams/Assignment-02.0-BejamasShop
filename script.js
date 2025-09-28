document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart");
  const addToCartButtons = document.querySelectorAll(".btn");
 

  let cart = [];

  // Ccart elements
  const cartCount = document.createElement("span");
  cartCount.classList.add("cart-count");
  cartCount.textContent = "0";
  cartIcon.appendChild(cartCount);

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  document.body.appendChild(cartBox);

  // cart UI
  function updateCart() {
    cartCount.textContent = cart.length;

    cartBox.innerHTML = "<h3>Your Cart</h3>";
    if (cart.length === 0) {
      cartBox.innerHTML += "<p>Cart is empty</p>";
    } else {
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name} - ${item.price}</span>
          <button class="remove-item" data-index="${index}">&times;</button>
        `;
        cartBox.appendChild(itemDiv);
      });

      const clearBtn = document.createElement("button");
      clearBtn.classList.add("clear-cart");
      clearBtn.textContent = "Clear Cart";
      clearBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
      });
      cartBox.appendChild(clearBtn);
    }

    // Remove individual items (x button)
    cartBox.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  // Adding items to cart
  addToCartButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      const productCard = e.target.closest(".card, .main-product");
      const name = productCard.querySelector("h1, h4").textContent;
      const img = productCard.querySelector("img").src;
      let priceElement = productCard.querySelector(".price");
     const price = priceElement ? priceElement.textContent : "$10000.00";

      cart.push({ name, img, price });
      updateCart();
    });
  });

  // Toggle cart visibility
  cartIcon.addEventListener("click", () => {
    cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
  });
  });