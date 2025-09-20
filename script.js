
const products = {
  mascara: {
    name: "ماسكارا أوبرا مضادة للمياه",
    price: "140 ",
    oldPrice: "180 ",
    images: ["image/mac1.png", "image/mac2.png", "image/mac3.png"]
  },
  foundation: {
    name: "كريم أساس مات",
    price: "200 ",
    oldPrice: "250 ",
    images: ["image/eyelash-1.png", "image/eyelash-2.png", "image/eyelash-3.png"]
  },
  lipstick: {
    name: "حمرة شفايف لامعة",
    price: "90 ",
    oldPrice: "120 ",
    images: ["image/roug-1.png", "image/roug-2.png", "image/roug-3.png"]
  },
  blush: {
    name: "حمرة خدود طبيعية",
    price: "75 ",
    oldPrice: "100 ",
    images: ["image/red-2.png", "image/red-3.png", "image/red-1.png"]
  },
  eyeshadow: {
    name: "آيشادو ألوان متعددة",
    price: "160 ",
    oldPrice: "200 ",
    images: ["image/mackup-1.png", "image/mackup-2.png", "image/mackup-3.png"]
  }
};

let currentProduct = products.mascara;
let currentIndex = 0;
let autoSlideInterval = null;

// تحديث العرض مع انيميشن
function updateView() {
  const container = document.querySelector(".slider-images");
  container.innerHTML = ""; // امسح الصور القديمة

  currentProduct.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    if (index === currentIndex) {
      img.classList.add("active");
    }
    container.appendChild(img);
  });

  // تحديث باقي التفاصيل
  document.getElementById("productName").innerText = currentProduct.name;
  document.getElementById("productPrice").innerText = currentProduct.price;
  document.getElementById("oldPrice").innerText = currentProduct.oldPrice;
}

// السلايدر الأوتوماتيك
function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);

  autoSlideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % currentProduct.images.length;
    slideTo(nextIndex);
  }, 3000); // كل 5 ثواني
}

// الانيميشن
function slideTo(nextIndex) {
  const container = document.querySelector(".slider-images");
  const images = container.querySelectorAll("img");

  const currentImage = images[currentIndex];
  const nextImage = images[nextIndex];

  if (!currentImage || !nextImage) return;

  currentImage.classList.remove("active");
  currentImage.classList.add("exit-left");

  nextImage.classList.remove("exit-left", "exit-right");
  nextImage.classList.add("active");

  currentIndex = nextIndex;
}

// تغيير المنتج
function changeProduct(type, element) {
  currentProduct = products[type];
  currentIndex = 0;
  updateView();
  startAutoSlide();

  // تحديث القائمة
//   document.getElementById("menuTitle").style.display = "none";
  document.querySelectorAll(".product-menu li").forEach(li => li.classList.remove("active"));
  element.classList.add("active");
}

// اول تحميل
updateView();
startAutoSlide();

