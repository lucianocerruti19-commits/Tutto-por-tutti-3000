let cart = [];
let userLocation = "No activada";

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  let cartDiv = document.getElementById("cartItems");
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = `<p class="empty">Carrito vacío 🍔</p>`;
    document.getElementById("totalPrice").innerText = "$0";
    return;
  }

  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    cartDiv.innerHTML += `
      <div style="margin:10px; padding:10px; background:#222; border-radius:15px;">
        ${item.name} - $${item.price}
        <button onclick="removeItem(${index})"
        style="float:right; background:red; border:none; color:white; border-radius:10px; padding:5px;">
        X</button>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = "$" + total;
}

/* UBICACIÓN REAL */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        userLocation = `https://maps.google.com/?q=${lat},${lon}`;

        document.getElementById("locationText").innerText =
          "Ubicación activada ✅";
      },
      () => {
        alert("No se pudo obtener ubicación.");
      }
    );
  }
}

/* WHATSAPP */
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Carrito vacío.");
    return;
  }

  let message = "🍔 Pedido Tutto Premium:%0A%0A";

  cart.forEach((item) => {
    message += `✅ ${item.name} - $${item.price}%0A`;
  });

  message += `%0A📍 Ubicación: ${userLocation}`;

  window.open("https://wa.me/5492644517816?text=" + message);
}

/* FILTRO */
function filterMenu(category) {
  let items = document.querySelectorAll(".food-card");

  items.forEach((card) => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(category)
        ? "block"
        : "none";
    }
  });
}