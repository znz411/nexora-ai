const products = [

  {
    id: 1,
    category: "phones",
    emoji: "📱",
    name: "iPhone 15",
    price: 75000,
    rating: 4.8,
    bestFor: "Camera and premium experience",
    desc: "Premium Apple smartphone with excellent performance."
  },

  {
    id: 2,
    category: "phones",
    emoji: "📱",
    name: "Nothing Phone 2",
    price: 42000,
    rating: 4.5,
    bestFor: "Style and smooth UI",
    desc: "Stylish transparent phone with smooth experience."
  },

  {
    id: 3,
    category: "phones",
    emoji: "📱",
    name: "OnePlus 12R",
    price: 39999,
    rating: 4.6,
    bestFor: "Gaming and battery",
    desc: "Excellent gaming phone with fast charging."
  },

  {
    id: 4,
    category: "laptops",
    emoji: "💻",
    name: "HP Pavilion",
    price: 58000,
    rating: 4.4,
    bestFor: "Students and coding",
    desc: "Balanced laptop for coding and office work."
  },

  {
    id: 5,
    category: "laptops",
    emoji: "💻",
    name: "MacBook Air M2",
    price: 95000,
    rating: 4.8,
    bestFor: "Creators and students",
    desc: "Lightweight laptop with amazing battery life."
  },

  {
    id: 6,
    category: "laptops",
    emoji: "💻",
    name: "ASUS ROG",
    price: 85000,
    rating: 4.7,
    bestFor: "Gaming",
    desc: "Powerful gaming laptop with RTX graphics."
  },

  {
    id: 7,
    category: "headphones",
    emoji: "🎧",
    name: "Sony WH-1000XM5",
    price: 25000,
    rating: 4.9,
    bestFor: "Noise cancellation",
    desc: "Premium headphones with excellent sound quality."
  },

  {
    id: 8,
    category: "headphones",
    emoji: "🎧",
    name: "Boat Rockerz",
    price: 2500,
    rating: 4.1,
    bestFor: "Budget music",
    desc: "Affordable wireless headphones with deep bass."
  },

  {
    id: 9,
    category: "watches",
    emoji: "⌚",
    name: "Noise Smartwatch",
    price: 3500,
    rating: 4.2,
    bestFor: "Fitness tracking",
    desc: "Affordable smartwatch with fitness features."
  },

  {
    id: 10,
    category: "shoes",
    emoji: "👟",
    name: "Nike Air Max",
    price: 9000,
    rating: 4.6,
    bestFor: "Comfort sneakers",
    desc: "Comfortable premium sneakers."
  },

  {
    id: 11,
    category: "powerbanks",
    emoji: "🔋",
    name: "Mi Powerbank 20000mAh",
    price: 1800,
    rating: 4.3,
    bestFor: "Travel backup",
    desc: "Large capacity fast charging powerbank."
  },

  {
    id: 12,
    category: "clothes",
    emoji: "👕",
    name: "H&M Relaxed Hoodie",
    price: 2200,
    rating: 4.2,
    bestFor: "Casual fashion",
    desc: "Comfortable hoodie with modern design."
  }

];

let compareList = [];

/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

  const grid =
  document.getElementById("productGrid");

  if(list.length === 0){

    grid.innerHTML =
    `<p>No products found.</p>`;

    return;
  }

  grid.innerHTML =
  list.map(product => `

    <div class="product-card">

      <div class="emoji">
        ${product.emoji}
      </div>

      <h3>${product.name}</h3>

      <p>${product.desc}</p>

      <p>
        ⭐ ${product.rating}
        <br>
        ${product.bestFor}
      </p>

      <span class="price">
        ₹${product.price.toLocaleString("en-IN")}
      </span>

      <div class="card-actions">

        <button
        class="small-btn"
        onclick="addToCompare(${product.id})">
        Compare
        </button>

        <button
        class="small-btn"
        onclick="saveWishlist('${product.name}')">
        Wishlist
        </button>

      </div>

    </div>

  `).join("");
}

/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {

  const input =
  document
  .getElementById("searchInput")
  .value
  .toLowerCase();

  const resultText =
  document
  .getElementById("resultText");

  const filtered =
  products.filter(product =>

    product.name.toLowerCase().includes(input)

    ||

    product.category.toLowerCase().includes(input)

    ||

    product.bestFor.toLowerCase().includes(input)

    ||

    product.desc.toLowerCase().includes(input)

  );

  resultText.innerText =

  input

  ?

  `Showing results for "${input}"`

  :

  "Showing all products.";

  displayProducts(filtered);

  document
  .getElementById("products")
  .scrollIntoView({
    behavior: "smooth"
  });
}

/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts() {

  const category =
  document
  .getElementById("categoryFilter")
  .value;

  const budget =
  document
  .getElementById("budgetFilter")
  .value;

  let filtered = products;

  if(category !== "all"){

    filtered =
    filtered.filter(product =>
      product.category === category
    );
  }

  if(budget !== "all"){

    filtered =
    filtered.filter(product =>
      product.price <= Number(budget)
    );
  }

  document
  .getElementById("resultText")
  .innerText =
  "Filtered recommendations.";

  displayProducts(filtered);

  document
  .getElementById("products")
  .scrollIntoView({
    behavior: "smooth"
  });
}

/* =========================
   COMPARE PRODUCTS
========================= */

function addToCompare(id){

  const product =
  products.find(item => item.id === id);

  if(compareList.find(item => item.id === id)){

    alert("Already added.");
    return;
  }

  if(compareList.length >= 3){

    alert("Only 3 products allowed.");
    return;
  }

  compareList.push(product);

  renderCompare();
}

function renderCompare(){

  const box =
  document.getElementById("compareBox");

  if(compareList.length === 0){

    box.innerHTML =
    `<p>No products selected.</p>`;

    return;
  }

  box.innerHTML =

  `
  <table class="compare-table">

    <tr>
      <th>Product</th>
      ${compareList.map(p =>
        `<td>${p.name}</td>`
      ).join("")}
    </tr>

    <tr>
      <th>Price</th>
      ${compareList.map(p =>
        `<td>₹${p.price.toLocaleString("en-IN")}</td>`
      ).join("")}
    </tr>

    <tr>
      <th>Rating</th>
      ${compareList.map(p =>
        `<td>${p.rating} ⭐</td>`
      ).join("")}
    </tr>

    <tr>
      <th>Best For</th>
      ${compareList.map(p =>
        `<td>${p.bestFor}</td>`
      ).join("")}
    </tr>

  </table>

  <br>

  <button onclick="clearCompare()">
    Clear Compare
  </button>
  `;
}

function clearCompare(){

  compareList = [];

  renderCompare();
}

/* =========================
   WISHLIST
========================= */

function saveWishlist(name){

  let wishlist =

  JSON.parse(
    localStorage.getItem("wishlist")
  )

  ||

  [];

  wishlist.push(name);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  alert(`${name} added to wishlist.`);
}

/* =========================
   AI ASSISTANT
========================= */

async function askAI(){

  const input =
  document.getElementById("chatInput").value;

  const reply =
  document.getElementById("aiReply");

  reply.classList.remove("hidden");

  if(!input.trim()){

    reply.innerHTML =
    "Please ask a shopping question.";

    return;
  }

  reply.innerHTML =
  "Nexora AI is thinking...";

  try{

    const response =

    await fetch(
      "https://nexora-ai-qgx9.onrender.com",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          question: input
        })

      }
    );

    const data =
    await response.json();

    reply.innerHTML =
    formatAIResponse(data.answer);

  }

  catch(error){

    reply.innerHTML =
    "AI server is not running.";
  }
}

/* =========================
   FORMAT AI RESPONSE
========================= */

function formatAIResponse(text){

  return text

  .replace(/\*\*(.*?)\*\*/g,
  "<h3>$1</h3>")

  .replace(/•/g,
  "<br>•")

  .replace(/\n/g,
  "<br>");
}

/* =========================
   SMOOTH SCROLL
========================= */

function scrollToSection(id){

  document
  .getElementById(id)
  .scrollIntoView({
    behavior: "smooth"
  });
}

/* =========================
   INITIAL LOAD
========================= */

displayProducts(products);